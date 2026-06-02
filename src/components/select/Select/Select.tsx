import { useEffect, useRef, useState } from "react";
import styles from "./Select.module.css";
import SelectArrow from "./select.svg?react";
import { createPortal } from "react-dom";

interface SelectRoleProps {
  id?: number;
  listSelect: { [key: number]: string } | Record<string, string>;
  defaultValue: number | string;
  valueBack?: (defaultValue: number | string) => void;
  style?: React.CSSProperties;
}

export const Select = ({ id, listSelect, defaultValue, valueBack, style }: SelectRoleProps) => {
  const [selected, setSelected] = useState<number | string>(defaultValue);
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const selectedRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollParentsRef = useRef<(HTMLElement | Window)[]>([]);

  function placeDropdown() {
    const trigger = selectedRef.current;
    const dropdown = dropdownRef.current;
    if (!trigger || !dropdown) return;

    const MAX_HEIGHT = 342;

    const triggerRect = trigger.getBoundingClientRect();
    const dropdownHeight = Math.min(dropdown.scrollHeight, MAX_HEIGHT);

    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    const openDown = spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove;

    dropdown.style.position = "fixed";
    dropdown.style.width = `${triggerRect.width}px`;
    dropdown.style.left = `${triggerRect.left}px`;

    if (openDown) {
      dropdown.style.top = `${triggerRect.bottom}px`;
      dropdown.dataset.side = "bottom";
    } else {
      dropdown.style.top = `${triggerRect.top - dropdownHeight}px`;
      dropdown.dataset.side = "top";
    }
  }

  function handleSelect(key: string) {
    const newValue = key;
    valueBack?.(newValue);
    setSelected(newValue);
    setOpenSelect(false);
  }

  function getScrollParents(el: HTMLElement | null): (HTMLElement | Window)[] {
    const result: (HTMLElement | Window)[] = [window];
    if (!el) return result;

    let parent = el.parentElement;

    while (parent && parent !== document.body) {
      const style = getComputedStyle(parent);
      const overflowY = style.overflowY;

      if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
        result.push(parent);
      }

      parent = parent.parentElement;
    }

    return result;
  }

  useEffect(() => {
    if (!openSelect || !selectedRef.current) return;

    placeDropdown();

    const update = () => placeDropdown();

    const watchingClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.select}`) && !target.closest(`.${styles.options}`)) {
        setOpenSelect(false);
      }
    };

    const closeOnScroll = () => setOpenSelect(false);

    scrollParentsRef.current = getScrollParents(selectedRef.current);

    scrollParentsRef.current.forEach((el) => el.addEventListener("scroll", closeOnScroll, { passive: true }));

    window.addEventListener("resize", update);
    document.addEventListener("click", watchingClick);

    return () => {
      scrollParentsRef.current.forEach((el) => el.removeEventListener("scroll", closeOnScroll));

      window.removeEventListener("resize", update);
      document.removeEventListener("click", watchingClick);
    };
  }, [openSelect]);

  useEffect(() => {
    const close = () => setOpenSelect(false);
    window.addEventListener("close-all-selects", close);
    return () => window.removeEventListener("close-all-selects", close);
  }, []);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  const filterList = id
    ? Object.fromEntries(Object.entries(listSelect).filter(([key]) => parseInt(key) <= id))
    : listSelect;

  return (
    <div className={`${styles.select} ${openSelect && styles.open}`} style={style}>
      <div
        ref={selectedRef}
        data-value={selected}
        className={styles.selected}
        onClick={() => {
          if (!openSelect) {
            window.dispatchEvent(new Event("close-all-selects"));
            setOpenSelect(true);
          } else {
            setOpenSelect(false);
          }
        }}
      >
        <span>{filterList[selected as keyof typeof filterList]}</span>
        <SelectArrow />
      </div>

      {openSelect &&
        createPortal(
          <div ref={dropdownRef} className={styles.options}>
            {Object.entries(filterList).map(([key, value]) => (
              <div
                data-tooltip={value}
                onClick={() => handleSelect(key)}
                data-value={key}
                key={`option-select-${key}`}
                className={`${styles.option} ${key === selected && styles.isSelected}`}
              >
                <span>{value}</span>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};
