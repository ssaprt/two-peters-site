import { observer } from "mobx-react-lite";
import styles from "./SearchFromInputText.module.css";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { City, geoCodeStore } from "@/stores/GEO/GeoCodeStore";
import { DefaultScrollBar } from "@/components/scrollbar/DefaultScrollBar/DefaultScrollBar";

interface SearchFromInputTextProps {
  refInput: React.RefObject<HTMLInputElement | null>;
}

export const SearchFromInputText = observer(({ refInput }: SearchFromInputTextProps) => {
  const [position, setPosition] = useState({} as React.CSSProperties);
  const [focusInput, setFocusInput] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleHide = () => {
    if (ref.current) {
      ref.current.classList.add(styles.hidden);
    }
  };

  const handleSelect = (value: City) => {
    geoCodeStore.setSelected(value);
    handleHide();
  };

  const onFocus = () => {
    setFocusInput(true);
  };

  const onBlur = () => {
    handleHide();
    geoCodeStore.endLoading();
    refInput.current?.blur();
  };

  const endAnim = (e: React.AnimationEvent) => {
    if (e.animationName.includes("hidden")) {
      setFocusInput(false);
      setPosition({} as React.CSSProperties);
    }
  };

  useEffect(() => {
    if (!refInput.current) return;

    const el = refInput.current;

    el.addEventListener("focus", onFocus);
    el.addEventListener("blur", onBlur);

    return () => {
      el.removeEventListener("focus", onFocus);
      el.removeEventListener("blur", onBlur);
    };
  }, [refInput]);

  useEffect(() => {
    if (!ref.current || !focusInput || (!geoCodeStore.geoArray.length && !geoCodeStore.loading)) return;

    const el = refInput.current as HTMLInputElement;
    const { top, left, width, height } = el.getBoundingClientRect();

    setPosition({
      top: `${top + height + 4}px`,
      left: `${left}px`,
      width: `${width}px`,
    });

    requestAnimationFrame(() => {
      ref.current?.classList.add(styles.show);
    });

    const onScroll = (e: Event) => {
      const target = e.target as Node;
      if (ref.current?.contains(target)) return;
      onBlur();
    };

    window.addEventListener("scroll", onScroll, true);

    return () => {
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [focusInput, geoCodeStore.geoArray.length, geoCodeStore.loading]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node) && !refInput.current?.contains(e.target as Node)) {
        onBlur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!focusInput) return null;

  if (!geoCodeStore.loading && geoCodeStore.geoArray.length === 0) return null;

  return createPortal(
    <div onAnimationEnd={endAnim} ref={ref} style={position} className={styles.searcher}>
      <div className={styles.scroll}>
        {geoCodeStore.loading && (
          <div style={{ pointerEvents: "none" }} className={styles.item}>
            Загрузка...
          </div>
        )}
        {!geoCodeStore.loading &&
          geoCodeStore.geoArray.map((item) => (
            <div className={styles.item} onClick={() => handleSelect(item)} key={item.id}>
              {item.full_name}
            </div>
          ))}
      </div>
      {focusInput &&
        ref.current &&
        (() => {
          const el = ref.current as HTMLDivElement;
          if (el.offsetHeight < el.scrollHeight) return null;
          return <DefaultScrollBar scrollBar={{ positionMode: "over" }} />;
        })()}
    </div>,
    document.body,
  );
});
