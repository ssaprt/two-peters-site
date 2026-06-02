import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Tooltip.module.css";

const HIDE_DELAY = 120;

export const Tooltip = () => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const anchorRef = useRef<HTMLElement | null>(null);
    const hideTimerRef = useRef<number | null>(null);

    const [content, setContent] = useState<string | null>(null);

    const [visible, setVisible] = useState(false);

    const [position, setPosition] = useState({
        top: "0px",
        left: "0px",
    });

    const [customStyle, setCustomStyle] = useState<React.CSSProperties>({});

    const isTouchDevice = () => window.matchMedia("(pointer: coarse)").matches;

    // =========================
    // HELPERS
    // =========================

    const clearHideTimer = () => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
    };

    const clearTooltip = () => {
        anchorRef.current = null;

        setVisible(false);

        clearHideTimer();

        setContent(null);
    };

    const calculatePosition = () => {
        const anchor = anchorRef.current;
        const body = bodyRef.current;

        if (!anchor || !body) return;

        const rect = anchor.getBoundingClientRect();

        const arrowH = 6;
        const padding = 8;

        let top = rect.top - body.offsetHeight - arrowH - 10;

        // если не помещается сверху —
        // показываем снизу
        if (top < padding) {
            top = rect.bottom + arrowH + 10;
        }

        const left = Math.min(
            window.innerWidth - body.offsetWidth - padding,

            Math.max(
                padding,
                rect.left + rect.width / 2 - body.offsetWidth / 2,
            ),
        );

        setPosition({
            top: `${top}px`,
            left: `${left}px`,
        });
    };

    const showTooltip = (el: HTMLElement) => {
        const color = el.dataset.color;
        const bgColor = el.dataset.bgcolor;

        const colorText = {
            "--color": color ? color : "var(--global-bg-color)",
        } as React.CSSProperties;

        const colorBg = {
            "--bgColor": bgColor ? bgColor : "var(--global-color-link)",
        } as React.CSSProperties;

        setCustomStyle((prev) => ({
            ...prev,
            ...colorText,
            ...colorBg,
        }));

        const text = el.dataset.tooltip;

        if (!text) return;

        anchorRef.current = el;

        clearHideTimer();

        setVisible(false);

        setContent(text);

        requestAnimationFrame(() => {
            calculatePosition();

            setVisible(true);
        });
    };

    // =========================
    // POSITION
    // =========================

    useLayoutEffect(() => {
        if (!content) return;

        calculatePosition();
    }, [content]);

    // =========================
    // DESKTOP
    // =========================

    const onPointerEnter = (e: PointerEvent) => {
        if (isTouchDevice()) return;

        const target = e.target as Element | null;

        if (!target) return;

        const el = target.closest<HTMLElement>("[data-tooltip]");

        if (!el) return;

        if (anchorRef.current && anchorRef.current !== el) {
            showTooltip(el);

            return;
        }

        if (!anchorRef.current) {
            showTooltip(el);
        }
    };

    const onPointerLeave = (e: PointerEvent) => {
        if (isTouchDevice()) return;

        const target = e.target as Element | null;

        const related = e.relatedTarget as Element | null;

        if (!target) return;

        const el = target.closest<HTMLElement>("[data-tooltip]");

        if (!el) return;

        if (related && related.closest("[data-tooltip]")) {
            return;
        }

        anchorRef.current = null;

        setVisible(false);

        clearHideTimer();

        hideTimerRef.current = window.setTimeout(() => {
            if (!anchorRef.current) {
                setContent(null);
            }
        }, HIDE_DELAY);
    };

    // =========================
    // TOUCH
    // =========================

    const onTouchStart = (e: TouchEvent) => {
        const target = e.target as Element | null;

        if (!target) return;

        const el = target.closest<HTMLElement>("[data-tooltip]");

        // тап вне tooltip
        if (!el) {
            clearTooltip();
            return;
        }

        // повторный тап —
        // закрываем
        if (anchorRef.current === el && visible) {
            clearTooltip();
            return;
        }

        showTooltip(el);
    };

    // =========================
    // EVENTS
    // =========================

    useEffect(() => {
        const onPointerDown = (e: PointerEvent) => {
            // desktop
            if (!isTouchDevice()) {
                clearTooltip();
                return;
            }

            // mobile / touch
            const target = e.target as Element | null;

            // если нажали по tooltip anchor —
            // не закрываем
            if (target && target.closest("[data-tooltip]")) {
                return;
            }

            // тап вне tooltip
            clearTooltip();
        };

        document.addEventListener("pointerover", onPointerEnter, true);

        document.addEventListener("pointerout", onPointerLeave, true);

        document.addEventListener("touchstart", onTouchStart, true);

        document.addEventListener("pointerdown", onPointerDown, true);

        document.addEventListener("keydown", clearTooltip, true);

        window.addEventListener("resize", calculatePosition);

        window.addEventListener("scroll", calculatePosition, true);

        return () => {
            document.removeEventListener("pointerover", onPointerEnter, true);

            document.removeEventListener("pointerout", onPointerLeave, true);

            document.removeEventListener("touchstart", onTouchStart, true);

            document.removeEventListener("pointerdown", onPointerDown, true);

            document.removeEventListener("keydown", clearTooltip, true);

            window.removeEventListener("resize", calculatePosition);

            window.removeEventListener("scroll", calculatePosition, true);

            clearHideTimer();
        };
    }, [visible]);

    // =========================
    // REMOVE IF ANCHOR DELETED
    // =========================

    useEffect(() => {
        if (!content || !anchorRef.current) return;

        const interval = window.setInterval(() => {
            if (anchorRef.current && !document.contains(anchorRef.current)) {
                clearTooltip();
            }
        }, 100);

        return () => {
            window.clearInterval(interval);
        };
    }, [content]);

    // =========================
    // RENDER
    // =========================

    if (!content) return null;

    return createPortal(
        <div
            ref={tooltipRef}
            className={`${styles.tooltip} ${visible ? styles.show : ""}`}
            style={{
                ...position,
                ...customStyle,
            }}
        >
            <div ref={bodyRef} className={styles.body}>
                {content}
            </div>

            <div className={styles.arrow} />
        </div>,
        document.body,
    );
};
