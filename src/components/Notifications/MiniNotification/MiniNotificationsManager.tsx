import { observer } from "mobx-react-lite";
import styles from "./MiniNotification.module.css";
import { createPortal } from "react-dom";
import { MiniNotification } from "./MiniNotification";
import { miniNotificationsManager } from "@/stores/Notifications/MiniNotificationsManager";

// interface MiniNotificationProps {
//   type: "lucky" | "notification";
// }

export const MiniNotificationsManager = observer(() => {
  if (miniNotificationsManager.notifications.length === 0) return null;
  return createPortal(
    <div className={styles.manager}>
      <div className={styles.scroll}>
        {miniNotificationsManager.notifications.map((notification) => (
          <MiniNotification key={notification.id} {...notification} />
        ))}
      </div>
    </div>,
    document.body,
  );
});
