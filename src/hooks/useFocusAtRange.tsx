import { useCallback, useRef } from "react";

export const useStableCaret = () => {
  const caretPosition = useRef<number | null>(null);

  // сохранить позицию
  const saveCaret = useCallback((el: HTMLElement | null) => {
    if (!el) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const preRange = range.cloneRange();

    preRange.selectNodeContents(el);
    preRange.setEnd(range.endContainer, range.endOffset);

    caretPosition.current = preRange.toString().length;
  }, []);

  // восстановить позицию
  const restoreCaret = useCallback((el: HTMLElement | null) => {
    if (!el || caretPosition.current == null) return;

    requestAnimationFrame(() => {
      el.focus();

      const selection = window.getSelection();
      if (!selection) return;

      let charIndex = 0;
      const nodeStack: Node[] = [el];
      let node: Node | undefined;
      let found = false;

      const range = document.createRange();
      range.setStart(el, 0);
      range.collapse(true);

      while (!found && nodeStack.length > 0) {
        node = nodeStack.pop();

        if (!node) break;

        if (node.nodeType === Node.TEXT_NODE) {
          const textLength = node.textContent?.length ?? 0;

          if (charIndex + textLength >= caretPosition.current!) {
            range.setStart(node, caretPosition.current! - charIndex);
            range.collapse(true);
            found = true;
          } else {
            charIndex += textLength;
          }
        } else {
          let i = node.childNodes.length;
          while (i--) {
            nodeStack.push(node.childNodes[i]);
          }
        }
      }

      selection.removeAllRanges();
      selection.addRange(range);
    });
  }, []);

  return { saveCaret, restoreCaret };
};
