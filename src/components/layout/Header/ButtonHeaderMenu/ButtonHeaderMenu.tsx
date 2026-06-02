"use client";
import { useInfoScroll } from "@/hooks/Scrollbar/useInfoScroll";
import { headerStore } from "@/stores/HeaderStore";

import { scrollManager } from "@/stores/ScrollManager";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import styles from "./ButtonHeaderMenu.module.css";

export const ButtonHeaderMenu = observer(() => {
    const { mounted } = useInfoScroll();
    const refButton = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mounted) return;

        document.documentElement.dataset.menuOpen = headerStore.openHeader
            ? "open"
            : "close";

        headerStore.openHeader
            ? scrollManager.blockAll()
            : scrollManager.unblockAll();
    }, [mounted, headerStore.openHeader]);

    return (
        <div className={styles.scrollLayer}>
            <div
                id="header-button"
                ref={refButton}
                className={clsx(
                    styles.button,
                    headerStore.openHeader && styles.open,
                )}
                onClick={() => {
                    headerStore.toggleOpen();
                }}
            >
                <div className={styles.middle}></div>
            </div>
        </div>
    );
});
