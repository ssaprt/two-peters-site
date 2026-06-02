import { registerVisit } from "@/lib/api/registerVisit";
import { layoutStore } from "@/stores/LayoutStore";
import { timeStore } from "@/stores/Time";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFirstMounted } from "./useFirstMounted";

export const useApp = (isMobile: boolean) => {
    const [isReady, setIsReady] = useState(false);
    const prevIsReady = useRef(layoutStore.isReady);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isMounted = useFirstMounted();
    const [fixedHeader, setFixedHeader] = useState(false);
    const [needFillHeaderWithFixed, setNeedFillHeaderWithFixed] =
        useState(true);
    const [unmountLoader, setUnmountLoader] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setUnmountLoader(false);
    }, [pathname]);

    useEffect(() => {
        if (!isMobile) return;

        const enableSnap = () => {
            document.documentElement.dataset.snapReady = "true";
        };

        window.addEventListener("touchstart", enableSnap, {
            once: true,
        });

        return () => {
            window.removeEventListener("touchstart", enableSnap);
        };
    }, [isMobile]);

    useEffect(() => {
        if (!isMounted) return;

        document.documentElement.dataset.menuOpen = !isReady ? "open" : "close";
    }, [isMounted, isReady]);

    useEffect(() => {
        if (layoutStore.isReady && !prevIsReady.current) {
            prevIsReady.current = true;
            queueMicrotask(() => setIsReady(true));
        }

        return () => {
            setIsReady(false);
            prevIsReady.current = false;
            layoutStore.clear();
        };
    }, [layoutStore.isReady]);

    useEffect(() => {
        timeStore.globalTimeRefreshStart();
        registerVisit();
        return () => {
            timeStore.globalTimeRefreshStop();
        };
    }, []);

    const style = {
        position: "fixed",
        zIndex: 999999999999999999,
        top: 0,
    } as React.CSSProperties;

    const forScroll = {
        targetRef: scrollRef,
        config: {
            offset: 0,
            width: 6,
            heightPercent: 60,
            minThumbHeight: 60,
        },
    };

    const stylesForScrollBlock = `body fixed inset-0 overflow-hidden`;

    return {
        isReady,
        scrollRef,
        styleLoader: style,
        forScroll,
        stylesForScrollBlock,
        fixedHeader,
        setFixedHeader,
        needFillHeaderWithFixed,
        setNeedFillHeaderWithFixed,
        unmountLoader,
        setUnmountLoader,
        timeStore,
    };
};
