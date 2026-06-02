type Options = {
    scroll: number;
    start: number;
    end: number;
    direction: number;
};

export function getScrollProgress({ scroll, start, end, direction }: Options) {
    const raw = (scroll - start) / (end - start);

    const clamped = Math.min(Math.max(raw, 0), 1);

    return Number((direction === -1 ? 1 - clamped : clamped).toFixed(0));
}
