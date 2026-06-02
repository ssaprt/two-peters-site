import { CancelButton } from "@/components/button/SaveEditCancel/CancelButton";
import styles from "./Error.module.css";
import ErrorIcon from "./error.svg?react";

interface Error {
  children: string | React.ReactNode | React.ReactNode[];
  isHandler?: () => void;
}

export const Error = ({ children, isHandler }: Error) => {
  return (
    <div className={styles.error}>
      <ErrorIcon className={styles.errorIcon} />
      <span className={styles.message}>{children}</span>
      <CancelButton onClick={isHandler}>Закрыть</CancelButton>
    </div>
  );
};
