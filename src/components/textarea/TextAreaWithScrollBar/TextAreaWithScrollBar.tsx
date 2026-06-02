import { DefaultScrollBar } from "@/components/scrollbar/DefaultScrollBar/DefaultScrollBar";
import styles from "./TextAreaWithScrollBar.module.css";
import { useFocusAtEnd } from "@/hooks/useFocusAtEnd";
import { useEffect, useRef } from "react";

interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  backValue: (e: string) => void;
}

export const TextAreaWithScrollBar = ({ children, style, backValue, ...props }: Props) => {
  const focusAtEnd = useFocusAtEnd();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && children) {
      ref.current.innerText = children as string;
    }
  }, []);
  //eslint-disable-next-line
  const onFocus = (e: any) => {
    focusAtEnd(e.currentTarget);
  };
  //eslint-disable-next-line
  const handleChange = (e: any) => {
    backValue(e.target.innerText || "");
  };

  return (
    <div className={styles.textareaOverlay} {...props} style={style}>
      <div
        onFocus={onFocus}
        className={styles.textarea}
        contentEditable
        suppressContentEditableWarning={true}
        onInput={handleChange}
      ></div>

      <DefaultScrollBar
        sizeHeight={94}
        scrollBar={{
          width: 6,
          positionMode: "over",
        }}
        track={{
          style: {
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
          },
        }}
        thumb={{
          width: 4,
          style: {
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, .2)",
          },
          boxShadowOnHover: "none",
        }}
      />
    </div>
  );
};
