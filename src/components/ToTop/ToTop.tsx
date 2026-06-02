import Arrow from "@/assets/icons/common/arrow-grape.svg";
import { useInfoScroll } from "@/hooks/Scrollbar/useInfoScroll";
import { scrollManager } from "@/stores/ScrollManager";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import styles from "./ToTop.module.css";

export const ToTop = () => {
    const [visible, setVisible] = useState(false);
    const [visibleFooter, setVisibleFooter] = useState(0);
    const { scroll } = useInfoScroll();
    const refFooter = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refFooter.current) return;
        refFooter.current = document.getElementById("footer") as HTMLDivElement;
    }, []);

    useEffect(() => {
        setVisible(scroll > document.documentElement.clientHeight * 2);
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

    return (
        <Arrow
            onClick={() => scrollManager.scrollToIndex(0)}
            className={clsx(styles.top, visible && styles.visible)}
            style={{ "--b-pos": `${visibleFooter}px` } as React.CSSProperties}
        />
    );
};
