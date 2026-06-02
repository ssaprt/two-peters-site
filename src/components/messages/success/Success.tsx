import styles from "./Success.module.css";
import SuccessIcon from "./success.svg?react";
import { SaveButton } from "@/components/button/SaveEditCancel/SaveButton";

interface Success {
  children: string | React.ReactNode | React.ReactNode[];
  isHandler?: () => void;
}

export const Success = ({ children, isHandler }: Success) => {
  return (
    <div className={styles.success}>
      <SuccessIcon className={styles.successIcon} />
      <span className={styles.message}>{children}</span>
      <SaveButton onClick={isHandler}>Закрыть</SaveButton>
    </div>
  );
};
