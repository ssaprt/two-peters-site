import { ButtonHTMLAttributes, useRef } from "react";
import styles from "./../SaveEditCancel/SaveEditCancel.module.css";

interface TematicalColorButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactElement;
  isHidden?: boolean;
}

export const TematicalColorButton = ({ children, isHidden, icon, ...props }: TematicalColorButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const label = buttonRef.current?.querySelector("label");
    console.log(label);

    if (label && label.htmlFor) {
      const input = document.getElementById(label.htmlFor) as HTMLInputElement;

      if (input) {
        if (input.type === "checkbox" || input.type === "radio") {
          input.checked = !input.checked;
        } else if (input.type === "file") {
          input.click();
        }
      }
    }

    props.onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      {...props}
      className={`${styles.tematical} ${isHidden ? styles.visible : ""}`}
    >
      {icon}
      {children ? <span style={{ marginLeft: icon ? "6px" : "0px" }}>{children}</span> : null}
    </button>
  );
};
