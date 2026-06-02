import clsx from "clsx";
import styles from "./DefaultSwitch.module.css";

interface DefaultSwitchProps {
  switchTriggerValue: boolean;
  returnValueFn: (newValue: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const DefaultSwitch = ({
  switchTriggerValue,
  returnValueFn,
  disabled = false,
  loading = false,
}: DefaultSwitchProps) => {
  const handleToggle = () => {
    if (disabled || loading) return;

    returnValueFn(!switchTriggerValue);
  };

  return (
    <div
      onClick={handleToggle}
      className={clsx(
        styles.switch,
        switchTriggerValue ? styles.on : styles.off,
        styles.animate,
        (disabled || loading) && styles.disabled,
      )}
    >
      <div className={styles.thumb}>{loading && <div className={styles.loader} />}</div>
    </div>
  );
};
