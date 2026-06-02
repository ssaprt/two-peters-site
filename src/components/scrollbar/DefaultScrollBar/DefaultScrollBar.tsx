// HOW TO USE ============================================================================
//                                                                                       =
//  |--------------------------------------INFO---------------------------------------|  =
//  | Insert this component on the same level as another component that has scrolling |  =
//  | Note: The settings depend on the clientHeight of the parent wrapper             |  =
//  |--------------------------------------INFO---------------------------------------|  =
//                                                                                       =
//  |---------------------------------SET PARAMETERS----------------------------------|  =
//  | U can use any parameters from interface DefaultScrollBarProps                   |  =
//  | scrollBar?: {                                                                   |  =
//  |   width: number; - maximum width of the entire scrollbar. Default: 8            |  =
//  |   positionMode?: "over" | "after"; - position scrollbar. Default: "after"       |  =
//  |   hideIfNotScroll?: boolean; - hide scrollbar if not scroll. Default: false     |  =
//  |   hideIfNotScrollTime?: `${number}ms`; - time to hide bar. Default: 1500ms      |  =
//  | };                                                                              |  =
//  |                                                                                 |  =
//  | track?: {                                                                       |  =
//  |   style?: {                                                                     |  =
//  |     borderRadius?: `${number}px`; - border radius track. Default: 8             |  =
//  |     backgroundColor?: string; - background color track.                         |  =
//  |   };                                                                            |  =
//  | };                                                                              |  =
//  |                                                                                 |  =
//  | thumb?: {                                                                       |  =
//  |   width: number; - width of the thumb. Default: 4                               |  =
//  |   style?: {                                                                     |  =
//  |     borderRadius?: `${number}px`; - border radius thumb. Default: 8             |  =
//  |     backgroundColor?: string; - background color thumb.                         |  =
//  |   };                                                                            |  =
//  | };                                                                              |  =
//  |                                                                                 |  =
//  | sizeHeight?: number; - height of the scrollbar. Default: 94                     |  =
//  |---------------------------------SET PARAMETERS----------------------------------|  =
//                                                                                       =
// HOW TO USE ============================================================================

import DefaultScrollBarStore from "@/stores/DefaultScrollBarStore";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import styles from "./DefaultScrollBar.module.css";

// TYPES ========================================================================
interface ThumbAndTrackStyleProps {
    borderRadius?: `${number}px`;
    backgroundColor?: string;
}
type TrackAndThumbProps = {
    width: number;
    style?: ThumbAndTrackStyleProps;
};
interface DefaultScrollBarProps {
    scrollBar?: {
        width?: number;
        positionMode?: "over" | "after";
        hideIfNotScroll?: boolean;
        hideIfNotScrollTime?: `${number}ms`;
    };
    track?: Omit<TrackAndThumbProps, "width">;
    thumb?: TrackAndThumbProps & Record<"boxShadowOnHover", string>;
    sizeHeight?: number;
}
// TYPES ========================================================================
// DEFAULT PROPS ================================================================
const defaultScrollBarProps: Required<DefaultScrollBarProps> = {
    scrollBar: {
        width: 10,
        positionMode: "over",
        hideIfNotScroll: true,
        hideIfNotScrollTime: "1500ms",
    },
    track: {
        style: {
            borderRadius: "8px",
            backgroundColor: "rgba(255, 228, 148, 0.15)",
        },
    },
    thumb: {
        width: 6,
        style: {
            borderRadius: "8px",
            backgroundColor: "#262626",
        },
        boxShadowOnHover: "0px 0px 4px 0px rgba(255, 228, 148, 0.65)",
    },
    sizeHeight: 94,
};
// DEFAULT PROPS ================================================================

export const DefaultScrollBar = observer((props: DefaultScrollBarProps) => {
    const refScrollBar = useRef<HTMLDivElement>(null);

    const [scrollBarStore] = useState(() => new DefaultScrollBarStore());

    const config = {
        scrollBar: { ...defaultScrollBarProps.scrollBar, ...props.scrollBar },
        track: {
            style: {
                ...defaultScrollBarProps.track.style,
                ...props.track?.style,
            },
        },
        thumb: {
            width: props.thumb?.width ?? defaultScrollBarProps.thumb.width,
            style: {
                ...defaultScrollBarProps.thumb.style,
                ...props.thumb?.style,
            },
            boxShadowOnHover:
                props.thumb?.boxShadowOnHover ??
                defaultScrollBarProps.thumb.boxShadowOnHover,
        },
        sizeHeight: props.sizeHeight ?? defaultScrollBarProps.sizeHeight,
    };

    useEffect(() => {
        if (refScrollBar.current) {
            scrollBarStore.initialScrollBar(
                refScrollBar.current,
                Math.min(config.scrollBar.width!, 8),
            );
            scrollBarStore.setCustomHeight(config.sizeHeight || 98);
            scrollBarStore.setPositionMode(config.scrollBar.positionMode!);
            scrollBarStore.setHideTimeOut(
                config.scrollBar.hideIfNotScrollTime!,
            );
            scrollBarStore.enableAutoHide(config.scrollBar.hideIfNotScroll!);
            scrollBarStore.setStyles({
                thumbBoxShadow: config.thumb.boxShadowOnHover,
            });
        }
        return () => {
            scrollBarStore.cleanup();
        };
    }, [scrollBarStore]);

    return (
        <div
            ref={refScrollBar}
            className={`${styles.defaultScrollBar} ${scrollBarStore.visibleScrollBar ? styles.visible : ""}`}
        >
            <div
                className={styles.track}
                style={{
                    ...config.track.style,
                    width: `${config.scrollBar.width}px`,
                }}
            ></div>
            <div
                className={styles.thumb}
                style={{
                    ...config.thumb.style,
                    width: `${Math.min(config.thumb.width, config.scrollBar.width!)}px`,
                }}
            ></div>
        </div>
    );
});
