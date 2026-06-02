import { ButtonHTMLAttributes, useRef } from "react";
import styles from "./SaveEditCancel.module.css";

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactElement;
  isHidden?: boolean;
}

export const EditButton = ({ children, isHidden, icon, ...props }: EditButtonProps) => {
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

        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }

    props.onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      {...props}
      className={`${styles.editButton} ${isHidden ? styles.visible : ""}`}
    >
      {icon}
      {children ? <span style={{ marginLeft: icon ? "6px" : "0px" }}>{children}</span> : null}
    </button>
  );
};
