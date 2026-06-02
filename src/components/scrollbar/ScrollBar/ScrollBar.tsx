"use client";
import ArrowGrape from "@/assets/icons/common/arrow-grape.svg";
import { RefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ScrollBar.module.css";

// ======================================================
// TYPES
// ======================================================

type Props = {
    targetRef?: RefObject<HTMLElement | null>;

    config?: {
        width?: number;

        minThumbHeight?: number;

        rightOffset?: number;

        heightPercent?: number;
    };
};

// ======================================================
// DEFAULT CONFIG
// ======================================================

const defaultConfig = {
    width: 8,

    minThumbHeight: 30,

    rightOffset: 6,

    heightPercent: 80,
};

// ======================================================
// COMPONENT
// ======================================================

export default function Scrollbar({ targetRef, config }: Props) {
    const mergedConfig = {
        ...defaultConfig,
        ...config,
    };

    const scrollbarRef = useRef<HTMLDivElement>(null);

    const thumbRef = useRef<HTMLDivElement>(null);

    const [mounted, setMounted] = useState(false);

    const [visible, setVisible] = useState(false);

    const [thumbHeight, setThumbHeight] = useState(0);

    // ======================================================
    // MOUNT
    // ======================================================

    useEffect(() => {
        setMounted(true);
    }, []);

    // ======================================================
    // HELPERS
    // ======================================================

    const isBodyScroll = !targetRef;

    const getScrollData = () => {
        // ==========================================
        // BODY
        // ==========================================

        if (isBodyScroll) {
            const scrollHeight = document.documentElement.scrollHeight;

            const clientHeight = window.innerHeight;

            const scrollTop = window.scrollY;

            return {
                scrollHeight,

                clientHeight,

                scrollTop,

                rect: {
                    top: 0,

                    height: window.innerHeight,
                },
            };
        }

        // ==========================================
        // CONTAINER
        // ==========================================

        const target = targetRef.current;

        if (!target) return null;

        const rect = target.getBoundingClientRect();

        return {
            scrollHeight: target.scrollHeight,

            clientHeight: target.clientHeight,

            scrollTop: target.scrollTop,

            rect: {
                top: rect.top,

                height: rect.height,
            },
        };
    };

    // ======================================================
    // UPDATE
    // ======================================================

    useEffect(() => {
        if (!mounted) return;

        const scrollbar = scrollbarRef.current;

        if (!scrollbar) return;

        const onClick = (e: MouseEvent) => {
            // если кликнули по thumb — игнор
            if (
                thumbRef.current &&
                thumbRef.current.contains(e.target as Node)
            ) {
                return;
            }

            const data = getScrollData();

            if (!data) return;

            const { scrollHeight, clientHeight } = data;

            const rect = scrollbar.getBoundingClientRect();

            const clickY = e.clientY - rect.top;

            const thumbHeight = thumbRef.current?.offsetHeight ?? 0;

            const maxScroll = scrollHeight - clientHeight;

            const maxThumbMove = rect.height - thumbHeight;

            if (maxThumbMove <= 0) return;

            // центрируем thumb относительно клика
            const thumbTop = clickY - thumbHeight / 2;

            const ratio = thumbTop / maxThumbMove;

            const nextScroll = ratio * maxScroll;

            // BODY
            if (isBodyScroll) {
                window.scrollTo({
                    top: nextScroll,
                    behavior: "smooth",
                });
            }

            // CONTAINER
            else if (targetRef?.current) {
                targetRef.current.scrollTo({
                    top: nextScroll,
                    behavior: "smooth",
                });
            }
        };

        scrollbar.addEventListener("mousedown", onClick);

        return () => {
            scrollbar.removeEventListener("mousedown", onClick);
        };
    }, [mounted, targetRef, isBodyScroll]);

    useEffect(() => {
        if (!mounted) return;

        let frame = 0;

        const update = () => {
            cancelAnimationFrame(frame);

            frame = requestAnimationFrame(() => {
                if (!scrollbarRef.current || !thumbRef.current) return;

                const data = getScrollData();

                if (!data) return;

                const { scrollHeight, clientHeight, scrollTop, rect } = data;

                const maxScroll = scrollHeight - clientHeight;

                // ======================================
                // LIMITED HEIGHT
                // ======================================

                const scrollbarHeight =
                    rect.height * (mergedConfig.heightPercent / 100);

                const scrollbarTopOffset = (rect.height - scrollbarHeight) / 2;

                // ======================================
                // THUMB
                // ======================================

                const thumbHeight = Math.max(
                    (clientHeight / scrollHeight) * scrollbarHeight,

                    mergedConfig.minThumbHeight,
                );

                setThumbHeight(thumbHeight);

                const maxThumbMove = scrollbarHeight - thumbHeight - 2;

                const thumbTop =
                    maxScroll <= 0
                        ? 0
                        : (scrollTop / maxScroll) * maxThumbMove + 1;

                // ======================================
                // VISIBILITY
                // ======================================

                setVisible(scrollHeight > clientHeight + 1);

                // ======================================
                // SCROLLBAR
                // ======================================

                scrollbarRef.current.style.top = `${rect.top + scrollbarTopOffset}px`;

                scrollbarRef.current.style.right = `${mergedConfig.rightOffset}px`;

                scrollbarRef.current.style.width = `${mergedConfig.width}px`;

                scrollbarRef.current.style.height = `${scrollbarHeight}px`;

                // ======================================
                // THUMB
                // ======================================

                thumbRef.current.style.top = `${thumbTop}px`;

                thumbRef.current.style.height = `${thumbHeight}px`;
            });
        };

        update();

        // ==========================================
        // BODY
        // ==========================================

        if (isBodyScroll) {
            window.addEventListener("scroll", update, {
                passive: true,
            });
        }

        // ==========================================
        // CONTAINER
        // ==========================================
        else {
            const target = targetRef.current;

            target?.addEventListener("scroll", update, {
                passive: true,
            });
        }

        window.addEventListener("resize", update);

        return () => {
            cancelAnimationFrame(frame);

            if (isBodyScroll) {
                window.removeEventListener("scroll", update);
            } else {
                targetRef.current?.removeEventListener("scroll", update);
            }

            window.removeEventListener("resize", update);
        };
    }, [mounted, targetRef, isBodyScroll]);

    // ======================================================
    // DRAG
    // ======================================================

    useEffect(() => {
        if (!mounted) return;

        const thumb = thumbRef.current;

        const scrollbar = scrollbarRef.current;

        if (!thumb || !scrollbar) return;

        let dragging = false;

        let startY = 0;

        let startScroll = 0;

        const onMove = (e: MouseEvent) => {
            if (!dragging) return;

            const data = getScrollData();

            if (!data) return;

            const { scrollHeight, clientHeight } = data;

            const deltaY = e.clientY - startY;

            const maxScroll = scrollHeight - clientHeight;

            const thumbHeight = thumb.offsetHeight;

            const scrollbarHeight = scrollbar.offsetHeight;

            const maxThumbMove = scrollbarHeight - thumbHeight;

            if (maxThumbMove <= 0) return;

            const ratio = maxScroll / maxThumbMove;

            const newScroll = startScroll + deltaY * ratio;

            // ======================================
            // BODY
            // ======================================

            if (isBodyScroll) {
                window.scrollTo({
                    top: newScroll,
                });
            }

            // ======================================
            // CONTAINER
            // ======================================
            else {
                if (targetRef?.current) {
                    targetRef.current.scrollTop = newScroll;
                }
            }
        };

        const onUp = () => {
            dragging = false;

            document.removeEventListener("mousemove", onMove);

            document.removeEventListener("mouseup", onUp);
        };

        const onDown = (e: MouseEvent) => {
            e.preventDefault();

            dragging = true;

            startY = e.clientY;

            const data = getScrollData();

            if (!data) return;

            startScroll = data.scrollTop;

            document.addEventListener("mousemove", onMove);

            document.addEventListener("mouseup", onUp);
        };

        thumb.addEventListener("mousedown", onDown);

        return () => {
            thumb.removeEventListener("mousedown", onDown);
        };
    }, [mounted, targetRef, isBodyScroll]);

    // ======================================================
    // SSR
    // ======================================================

    if (!mounted) return null;

    // ======================================================
    // RENDER
    // ======================================================

    return createPortal(
        <div
            ref={scrollbarRef}
            className={`${styles.scrollbar} ${visible ? styles.visible : ""}`}
        >
            <div className={styles.track} />

            <div ref={thumbRef} className={styles.thumb}>
                <ArrowGrape className={styles.top} />

                <ArrowGrape className={styles.bottom} />
            </div>
        </div>,

        document.body,
    );
}
