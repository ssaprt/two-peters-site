"use client";
import { scrollManager } from "@/stores/ScrollManager";
import { sectionVisibilityStore } from "@/stores/SectionVisibilityStore";
import Lenis from "lenis";
import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
export const LenisContext = createContext<Lenis | null>(null);
export const ScrollProvider = observer(
    ({
        scrollRef,
        children,
    }: {
        scrollRef: React.RefObject<HTMLDivElement | null>;
        children: React.ReactNode;
    }) => {
        const { isMobile } = useAppContext();
        const pathname = usePathname();
        const lenisRef = useRef<Lenis | null>(null);
        useEffect(() => {
            const lenis = new Lenis({
                wrapper: scrollRef.current!,
                content: scrollRef.current?.firstElementChild!,
                duration: 0.5,
                autoRaf: true,
                smoothWheel: !isMobile,
                syncTouch: isMobile,
                touchMultiplier: 1,
                easing: (t) => 1 - Math.pow(1 - t, 4),
            });

            lenisRef.current = lenis;

            scrollManager.init(
                lenis,
                document.querySelector(".body")!,
                isMobile,
            );

            requestAnimationFrame(() => {
                sectionVisibilityStore.update();
            });

            lenis.on("scroll", () => {
                sectionVisibilityStore.update();
            });

            const wheelHandler = scrollManager.handleWheel.bind(scrollManager);
            const touchStartHandler = scrollManager.handleTouchStart;
            const touchMoveHandler = scrollManager.handleTouchMove;

            scrollRef.current?.addEventListener("wheel", wheelHandler, {
                passive: false,
            });
            scrollRef.current?.addEventListener(
                "touchstart",
                touchStartHandler,
                { passive: false },
            );
            scrollRef.current?.addEventListener("touchmove", touchMoveHandler, {
                passive: false,
            });

            // ResizeObserver — отдельно, не прерывает основной поток
            let pendingResize = false;
            let ro: ResizeObserver | null = null;
            const origScrollToSection =
                scrollManager.scrollToSection.bind(scrollManager);

            const content = scrollRef.current?.firstElementChild as HTMLElement;
            if (content) {
                ro = new ResizeObserver(() => {
                    if (scrollManager.isAnimating) {
                        pendingResize = true;
                        return;
                    }
                    lenis.resize();
                });

                scrollManager.scrollToSection = (
                    section,
                    duration,
                    onComplete,
                ) => {
                    origScrollToSection(section, duration, () => {
                        if (pendingResize) {
                            pendingResize = false;
                            lenis.resize();
                        }
                        onComplete?.();
                    });
                };

                ro.observe(content);
            }

            return () => {
                scrollRef.current?.removeEventListener("wheel", wheelHandler);
                scrollRef.current?.removeEventListener(
                    "touchstart",
                    touchStartHandler,
                );
                scrollRef.current?.removeEventListener(
                    "touchmove",
                    touchMoveHandler,
                );
                ro?.disconnect();
                scrollManager.scrollToSection = origScrollToSection;
                lenis.destroy();
            };
        }, [isMobile, pathname]);
        return (
            <LenisContext.Provider value={lenisRef.current}>
                {" "}
                {children}{" "}
            </LenisContext.Provider>
        );
    },
);
