import { observer } from "mobx-react-lite";
import styles from "./MiniNotification.module.css";
import { miniNotificationsManager, Notification } from "@/stores/Notifications/MiniNotificationsManager";
import { useEffect, useRef } from "react";
import IconX from "@/assets/icons/common/close.svg?react";

//icons
// import SuccessIcon from "@/assets/icons/notification/success.svg?react";
// import ErrorIcon from "@/assets/icons/notification/error.svg?react";
// import WarningIcon from "@/assets/icons/notification/warning.svg?react";

export const MiniNotification = observer((notification: Notification) => {
  const refItem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = refItem.current;
    if (!el) return;

    el.style.height = "0px";
    el.style.margin = "0px";
    requestAnimationFrame(() => {
      el.style.height = el.scrollHeight + "px";
      el.style.margin = "4px auto";
      requestAnimationFrame(() => {
        el.scrollIntoView();
      });
    });
  }, [refItem]);

  const endAnim = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName.includes("forDelete")) {
      refItem.current?.classList.add(styles.delete);
    }

    if (e.animationName.includes("hidden")) {
      miniNotificationsManager.delete(notification.id);
    }
  };

  return (
    <div className={styles.overlay}>
      <div
        onAnimationEnd={endAnim}
        ref={refItem}
        className={`${styles.notification} ${styles[notification.type]}`}
      >
        <div className={styles.top}>
          {notification.icon}
          <span>
            {notification.type === "success"
              ? "Успех"
              : notification.type === "error"
                ? "Ошибка"
                : "Информация"}
          </span>
          <IconX className={styles.close} onClick={() => refItem.current?.classList.add(styles.delete)} />
        </div>

        <div
          style={{ animationDuration: `${miniNotificationsManager.timeout}ms` }}
          className={styles.progressBar}
        ></div>

        <span className={styles.message}>{notification.message}</span>
      </div>
    </div>
  );
});
