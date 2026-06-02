import NotFoundIcon from "@/assets/icons/common/empty.svg";
import styles from "./NotFound.module.css";

interface Props {
    children?: React.ReactNode;
    title?: string;
    icon?: React.ReactNode;
}

export const NotFound = ({ children, title, icon }: Props) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.content}>
                <span>{title || "Ничего не найдено"}</span>
                {icon || <NotFoundIcon />}
                {children}
            </div>
        </div>
    );
};
