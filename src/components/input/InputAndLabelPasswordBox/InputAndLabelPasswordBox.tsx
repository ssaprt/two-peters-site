import { useState } from "react";
import styles from "./InputAndLabelPasswordBox.module.css";
import Eye from "@/assets/icons/login/eye.svg?react";
import EyeHide from "@/assets/icons/login/hide.svg?react";

interface InputAndLabelTextBoxProps {
  //eslint-disable-next-line
  props: any;
  idAndForHTML: string;
  labelText: string;
  colorFocus?: string;
}

export const InputAndLabelPasswordBox = ({
  props,
  idAndForHTML,
  labelText,
  colorFocus,
}: InputAndLabelTextBoxProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div
      className={styles.boxLineInput}
      style={{ "--color-focus": colorFocus || "var(--global-color-link)" } as React.CSSProperties}
    >
      <input
        className={styles.input}
        {...props}
        id={idAndForHTML}
        type={showPassword ? "text" : "password"}
      />
      <label htmlFor={idAndForHTML}>{labelText}</label>
      {showPassword ? (
        <EyeHide className={styles.eye} onClick={() => setShowPassword((prev) => !prev)} />
      ) : (
        <Eye className={styles.eye} onClick={() => setShowPassword((prev) => !prev)} />
      )}
    </div>
  );
};
