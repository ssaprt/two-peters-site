import { useCallback } from "react";

export const useFocusAtEnd = () => {
  const focusAtEnd = useCallback((el: HTMLElement | null) => {
    if (!el) return;

    requestAnimationFrame(() => {
      el.focus();

      const range = document.createRange();
      const selection = window.getSelection();
      if (!selection) return;

      selection.removeAllRanges();

      range.selectNodeContents(el);
      range.collapse(false);

      selection.addRange(range);
    });
  }, []);

  return focusAtEnd;
};
