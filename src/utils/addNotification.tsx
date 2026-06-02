import { miniNotificationsManager } from "@/stores/Notifications/MiniNotificationsManager";

//icons
import ErrorIcon from "@/assets/icons/notification/error.svg";
import SuccessIcon from "@/assets/icons/notification/success.svg";
import WarningIcon from "@/assets/icons/notification/warning.svg";

export interface MiniNotificationProps {
    message: string | React.ReactNode;
    type: "success" | "error" | "warning";
    icon?: React.ReactNode;
}

export const addNotification = ({
    message,
    type,
    icon,
}: MiniNotificationProps) => {
    const iconForInsert =
        icon ||
        (type === "success" ? (
            <SuccessIcon />
        ) : type === "error" ? (
            <ErrorIcon />
        ) : (
            <WarningIcon />
        ));
    miniNotificationsManager.add(message, type, iconForInsert);
};
