import { useAppContext } from "@/app/context/AppContext";
import DefaultIcon from "@/assets/icons/common/eye.svg";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
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
    const { isMobile } = useAppContext();
    const router = useRouter();
    const refButton = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const timeOutClick = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timeOutClick.current) {
                clearTimeout(timeOutClick.current);
            }
        };
    }, []);

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
                ref={refButton as React.RefObject<HTMLAnchorElement>}
                href={href}
                style={style}
                className={clsx(styles.button, "button-font")}
                onClick={(e) => {
                    e.preventDefault();
                    refButton.current?.classList.remove(styles.click);

                    requestAnimationFrame(() => {
                        refButton.current?.classList.add(styles.click);
                    });

                    timeOutClick.current = setTimeout(() => {
                        refButton.current?.classList.remove(styles.click);
                        router.push(href);
                    }, 400);
                }}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            ref={refButton as React.RefObject<HTMLButtonElement>}
            type="button"
            className={clsx(styles.button, "button-font")}
            onClick={(e) => {
                e.preventDefault();
                refButton.current?.classList.remove(styles.click);

                requestAnimationFrame(() => {
                    refButton.current?.classList.add(styles.click);
                });

                timeOutClick.current = setTimeout(() => {
                    refButton.current?.classList.remove(styles.click);
                    onClick?.();
                }, 1000);
            }}
            style={style}
        >
            {content}
        </button>
    );
};
