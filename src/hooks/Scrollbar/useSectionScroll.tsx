import { useMemo } from "react";

import { useInfoScroll } from "./useInfoScroll";

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, t: number) {
    return start + (end - start) * t;
}

export const useSectionScroll = (ref: React.RefObject<HTMLElement | null>) => {
    const { scroll } = useInfoScroll();

    const values = useMemo(() => {
        if (!ref.current) {
            return {
                progress: 0,
                visibleProgress: 0,
                relativeScroll: 0,
            };
        }

        const rect = ref.current.getBoundingClientRect();

        const vh = window.innerHeight;

        /**
         * timeline progress
         */
        const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);

        /**
         * visible amount
         */
        const visibleHeight = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);

        const visibleProgress = clamp(visibleHeight / rect.height, 0, 1);

        /**
         * relative pixels
         */
        const relativeScroll = vh - rect.top;

        return {
            progress,
            visibleProgress,
            relativeScroll,
        };
    }, [scroll]);

    const getProgressForAnim = ({
        from = 0,
        to = 1,
        output = [0, 1],
    }: {
        from?: number;
        to?: number;
        output?: [number, number];
    }) => {
        const t = clamp((values.progress - from) / (to - from), 0, 1);

        return lerp(output[0], output[1], t);
    };

    return {
        ...values,
        getProgressForAnim,
    };
};
