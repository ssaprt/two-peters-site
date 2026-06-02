import DefaultIcon from "@/assets/icons/common/eye.svg";
import clsx from "clsx";
import Link from "next/link";
import styles from "./buttonWithSvg.module.css";

type Props = {
    icon?: React.ReactNode;
    title?: string;
    subtitle?: string;
    href?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
    styleIcon?: React.CSSProperties;
};

export const ButtonWithSvg = ({
    icon = <DefaultIcon />,
    title = "Узнать подробнее",
    subtitle = "Скорее",
    href,
    onClick,
    style,
    styleIcon,
}: Props) => {
    const content = (
        <>
            <div className={styles.icon} style={styleIcon}>
                {icon}
            </div>

            <div className={styles.content}>
                <span className={styles.title}>{title}</span>
                <span className={styles.subtitle}>{subtitle}</span>
            </div>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                style={style}
                className={clsx(styles.button, "button-font")}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            className={clsx(styles.button, "button-font")}
            onClick={onClick}
            style={style}
        >
            {content}
        </button>
    );
};
