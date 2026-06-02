export function observeVisibility(
    element: Element,
    callback: (isVisible: boolean, entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = {},
): () => void {
    const observer = new IntersectionObserver(
        ([entry]) => {
            callback(entry.isIntersecting, entry);
        },
        {
            threshold: 0.3,
            rootMargin: "0px",
            ...options,
        },
    );

    observer.observe(element);

    return () => observer.disconnect();
}
