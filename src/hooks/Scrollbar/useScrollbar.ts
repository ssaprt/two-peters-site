"use client";
export type ScrollbarConfig = {
    width?: number;
    thumbWidth?: number;
    minThumbHeight?: number;
    rightOffset?: number;
};

export const calculateScrollbar = (
    target: HTMLElement,
    config: Required<ScrollbarConfig>,
) => {
    const rect = target.getBoundingClientRect();

    const scrollHeight = target.scrollHeight;

    const clientHeight = target.clientHeight;

    const scrollTop = target.scrollTop;

    const maxScroll = scrollHeight - clientHeight;

    const thumbHeight = Math.max(
        (clientHeight / scrollHeight) * rect.height,
        config.minThumbHeight,
    );

    const maxThumbMove = rect.height - thumbHeight;

    const thumbTop =
        maxScroll <= 0 ? 0 : (scrollTop / maxScroll) * maxThumbMove;

    return {
        containerTop: rect.top,
        containerLeft: rect.right - config.rightOffset,
        containerHeight: rect.height,

        thumbHeight,
        thumbTop,

        visible: scrollHeight > clientHeight + 1,
    };
};
