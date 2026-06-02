import styles from "./DefaultReference.module.css";
import QuestionIcon from "@/assets/icons/common/question.svg?react";

interface DefaultReferenceProps {
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export const DefaultReference = ({
  title = "Информация",
  children,
  icon,
  ...props
}: DefaultReferenceProps) => {
  return (
    <div {...props} className={styles.reference}>
      <div className={styles.info}>
        {icon || <QuestionIcon />}
        <span>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};
