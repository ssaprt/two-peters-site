import { useInfoScroll } from "@/hooks/Scrollbar/useInfoScroll";
import { useFooterModal } from "@/hooks/useFooterModal/useFooterModal";
import { apiService } from "@/services/ApiService";
import clsx from "clsx";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { Popup } from "../layout/Footer/Popup/Popup";
import styles from "./CookieBunner.module.css";

export const CookieBunner = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [visibleFooter, setVisibleFooter] = useState(0);
    const refTimer = useRef<NodeJS.Timeout | null>(null);
    const refFooter = useRef<HTMLDivElement>(null);
    const { scroll } = useInfoScroll();
    const { modalData, utilsData } = useFooterModal();
    const refBunner = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const verified = document.cookie
            .split("; ")
            .some((cookie) => cookie.startsWith("accept_cookie=1"));

        if (!verified) {
            setIsOpen(true);
        }
    }, []);

    const handleClick = () => {
        refBunner?.current?.classList.add(styles.hide);
        refTimer.current = setTimeout(() => {
            handleConfirm();
        }, 500);
    };

    useEffect(() => {
        if (refFooter.current) return;
        refFooter.current = document.getElementById("footer") as HTMLDivElement;
    }, []);

    useEffect(() => {
        if (!refFooter.current) return;
        setVisibleFooter(Number(getVisibilityFromBottom(refFooter.current)));
    }, [scroll]);

    function getVisibilityFromBottom(element: HTMLElement) {
        const rect = element.getBoundingClientRect();
        const visiblePixels = Math.max(
            0,
            Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top),
        );
        return visiblePixels.toFixed(0);
    }

    async function handleConfirm() {
        const result = await apiService.postData("accept-cookie", "accept");

        if (!result?.success) {
            return;
        }
        setIsOpen(false);
    }

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                ref={refBunner}
                className={styles.cookieBunner}
                style={{ "--b": `${visibleFooter}px` } as CSSProperties}
            >
                <div>
                    <span>Мы используем файлы cookie.</span>
                    <button
                        onClick={() => modalData.isOpen()}
                        className={clsx(styles.button, styles.more)}
                    >
                        Подробнее
                    </button>
                </div>
                <button
                    onClick={handleClick}
                    className={clsx(styles.button, styles.accept, "link-font")}
                >
                    Понятно
                </button>
            </div>
            <Popup type="cookie" modalData={modalData} utilsData={utilsData} />
        </>
    );
};
