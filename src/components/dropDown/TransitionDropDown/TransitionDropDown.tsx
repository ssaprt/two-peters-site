import { CaretDownOutlined } from "@ant-design/icons";
import styles from "./TransitionDropDown.module.css";
import { CSSProperties, useEffect, useRef, useState } from "react";

//use any styles parameters from interface TransitionDropDownPropsCss
//use any styles parameters from interface TransitionDropDownPropsCss
//use any styles parameters from interface TransitionDropDownPropsCss
//use any styles parameters from interface TransitionDropDownPropsCss
//use any styles parameters from interface TransitionDropDownPropsCss

interface TransitionDropDownProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactElement | null;
  style?: TransitionDropDownPropsCss;
}

export const TransitionDropDown = ({ children, title, icon, style }: TransitionDropDownProps) => {
  const [view, setView] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && view) {
      setMaxHeight(contentRef.current.scrollHeight + 12);
    } else {
      setMaxHeight(0);
    }
  }, [view, children]);

  return (
    <div
      style={style as CSSProperties}
      className={`${styles.transitionDropDown} ${view ? styles.active : ""}`}
    >
      <div className={styles.titleBlock} onClick={() => setView(!view)}>
        <span>{title}</span>
        {icon ? icon : <CaretDownOutlined />}
      </div>
      <div ref={contentRef} style={{ height: `${maxHeight}px` }} className={styles.bodyDropDown}>
        {children}
      </div>
    </div>
  );
};
