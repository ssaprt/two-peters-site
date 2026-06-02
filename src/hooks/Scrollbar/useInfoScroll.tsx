import { useAppContext } from "@/app/context/AppContext";
import { scrollManager } from "@/stores/ScrollManager";
import { useCallback, useEffect, useState } from "react";
import { useFirstMounted } from "../Utils/useFirstMounted";

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, t: number) {
    return start + (end - start) * t;
}

export const useInfoScroll = () => {
    const mounted = useFirstMounted();
    const { isMobile } = useAppContext();

    const [scrollProps, setScrollProps] = useState({
        scroll: 0,
        velocity: 0,
        progress: 0,
        direction: 0 as 0 | 1 | -1,
    });

    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowHeight(window.innerHeight);

            const handleResize = () => setWindowHeight(window.innerHeight);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const unsubscribe = scrollManager.subscribe((state) => {
            setScrollProps(state);
        });

        return unsubscribe;
    }, [mounted, isMobile]);

    const getProgressForAnim = useCallback(
        ({
            howMatchForAnim,
            start = 0,
            end = windowHeight,
        }: {
            howMatchForAnim: number;
            start?: number;
            end?: number;
        }) => {
            const progress = clamp(
                (scrollProps.scroll - start) / (end - start),
                0,
                1,
            );

            return lerp(howMatchForAnim, 0, progress);
        },
        [scrollProps.scroll, mounted],
    );

    const getSectionProgressForAnim = useCallback(
        ({
            section,
            howMatchForAnim,
            start = 0,
            end = 1,
        }: {
            section: HTMLElement | null;
            howMatchForAnim: number;
            start?: number;
            end?: number;
        }) => {
            if (!section) return howMatchForAnim;

            const rect = section.getBoundingClientRect();

            const vh = document.documentElement.clientHeight;

            /**
             * section timeline progress
             */
            const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);

            /**
             * custom range
             */
            const normalized = clamp((progress - start) / (end - start), 0, 1);

            return lerp(howMatchForAnim, 0, normalized);
        },
        [scrollProps.scroll],
    );

    return {
        mounted,
        scroll: scrollProps.scroll,
        velocity: scrollProps.velocity,
        direction: scrollProps.direction,
        getProgressForAnim,
        getSectionProgressForAnim,
    };
};
