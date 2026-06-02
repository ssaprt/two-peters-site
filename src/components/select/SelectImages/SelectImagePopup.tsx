import { useEffect, useRef, useState } from "react";
import styles from "./SelectImagePopup.module.css";
import SelectArrow from "../Select/select.svg?react";
import { createPortal } from "react-dom";
import { DefaultObserveImage } from "@/components/image/DefaultObserveImage/DefaultObserveImage";

interface SelectImageProps {
  imagesList: string[]; // массив путей к изображениям
  onImageSelect?: (file: File | null) => void; // возвращает File объект или null при закрытии
  style?: React.CSSProperties;
  title?: string;
}

export const SelectImagePopup = ({
  imagesList,
  onImageSelect,
  style,
  title = "Выбрать изображение",
}: SelectImageProps) => {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [loadedImages, setLoadedImages] = useState<Map<string, { file: File; preview: string }>>(new Map());

  const selectedRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollParentsRef = useRef<(HTMLElement | Window)[]>([]);

  useEffect(() => {
    if (!openSelect) return;

    setTimeout(() => {
      //eslint-disable-next-line
      placeDropdown();
    }, 0);
  }, [openSelect]);

  // Функция для получения полного пути к изображению
  const getFullImagePath = (imagePath: string): string => {
    // Убираем возможные двойные слеши
    const path = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
    return path;
  };

  // Загрузка изображения и создание File объекта
  const loadImageAsFile = async (imagePath: string): Promise<{ file: File; preview: string } | null> => {
    try {
      const fullPath = getFullImagePath(imagePath);
      const response = await fetch(fullPath);
      const blob = await response.blob();

      // Получаем имя файла из пути
      const fileName = imagePath.split("/").pop() || "image.jpg";

      // Определяем MIME тип
      const mimeType = blob.type || "image/jpeg";

      // Создаем File объект
      const file = new File([blob], fileName, { type: mimeType });

      // Создаем preview URL
      const preview = URL.createObjectURL(blob);

      const result = { file, preview };

      setLoadedImages((prev) => new Map(prev).set(imagePath, result));
      return result;
    } catch (error) {
      console.error(`Ошибка загрузки изображения ${imagePath}:`, error);
      return null;
    }
  };

  // Очистка preview URL при размонтировании
  useEffect(() => {
    return () => {
      loadedImages.forEach((data) => {
        URL.revokeObjectURL(data.preview);
      });
    };
  }, []);

  // Предзагрузка всех изображений при открытии
  useEffect(() => {
    if (openSelect) {
      imagesList.forEach((imagePath) => {
        if (!loadedImages.has(imagePath)) {
          loadImageAsFile(imagePath);
        }
      });
    }
  }, [openSelect]);

  function placeDropdown() {
    const trigger = selectedRef.current;
    const dropdown = dropdownRef.current;
    if (!trigger || !dropdown) return;

    const MAX_HEIGHT = 342;

    const triggerRect = trigger.getBoundingClientRect();
    const dropdownHeight = Math.min(dropdown.scrollHeight, MAX_HEIGHT);

    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    const openDown =
      spaceBelow >= dropdownHeight ? true : spaceAbove >= dropdownHeight ? false : spaceBelow >= spaceAbove;

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

  function handleImageSelect(imagePath: string) {
    const imageData = loadedImages.get(imagePath);
    if (imageData) {
      onImageSelect?.(imageData.file);
    }
    setOpenSelect(false);
  }

  function handleClose() {
    onImageSelect?.(null);
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
        handleClose();
      }
    };

    const closeOnScroll = () => handleClose();

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

  // Функция для получения имени файла из пути
  const getFileName = (path: string): string => {
    return path.split("/").pop() || path;
  };

  return (
    <div className={`${styles.select} ${openSelect && styles.open}`} style={style}>
      <div
        ref={selectedRef}
        className={styles.selected}
        onClick={() => {
          if (!openSelect) {
            window.dispatchEvent(new Event("close-all-selects"));
            setOpenSelect(true);
          } else {
            handleClose();
          }
        }}
      >
        <span className={styles.placeholder}>{title}</span>
        <SelectArrow />
      </div>

      {openSelect &&
        createPortal(
          <div ref={dropdownRef} className={styles.options}>
            {imagesList.map((imagePath, i) => {
              const imageData = loadedImages.get(imagePath);
              const fileName = getFileName(imagePath);
              const fullPath = getFullImagePath(imagePath);

              return (
                <div
                  onClick={() => imageData && handleImageSelect(imagePath)}
                  data-value={fullPath}
                  key={`option-image-${imagePath}-${i}`}
                  className={`${styles.option} ${!imageData && styles.disabled}`}
                >
                  <DefaultObserveImage src_image={fullPath} alt={fileName} />
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
};
