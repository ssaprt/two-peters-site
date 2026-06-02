import { DefaultScrollBar } from "@/components/scrollbar/DefaultScrollBar/DefaultScrollBar";
import { memo } from "react";

// Общие пропсы для скроллбара, используемого в FormAddress
const SCROLLBAR_PROPS = {
    sizeHeight: 94,
    scrollBar: {
        width: 6,
        positionMode: "over" as const,
    },
    track: {
        style: {
            borderRadius: "8px" as const,
            backgroundColor: "rgba(255, 255, 255, 0)",
        },
    },
    thumb: {
        width: 4,
        style: {
            borderRadius: "8px" as const,
            backgroundColor: "rgba(255, 255, 255, .2)",
        },
        boxShadowOnHover: "none",
    },
};

// Мемоизированный компонент скроллбара
export const DefaultScrollBarScroll = memo(() => {
    return <DefaultScrollBar {...SCROLLBAR_PROPS} />;
});

DefaultScrollBarScroll.displayName = "DefaultScrollBarScroll";
