import styles from "./DefaultLoader.module.css";

import React, { AnimationEvent } from "react";
import IconP from "./p.svg";
import IconS from "./s.svg";
import TextIconBrand from "./text.svg";

interface DefaultLoaderProps {
    elementIsReady?: boolean;
    callBackEndAnimation?: () => void;
    callBackStartAnimation?: () => void;
    timeAnimation?: `${number}ms`;
    style?: React.CSSProperties;
}

export const DefaultLoader = ({
    elementIsReady = true,
    callBackEndAnimation,
    callBackStartAnimation,
    timeAnimation = "1000ms",
    style,
}: DefaultLoaderProps) => {
    const endAnimationHidden = (e: AnimationEvent) => {
        if (e.animationName.includes("hidden")) {
            callBackEndAnimation?.();
        }
    };

    const startAnimation = (e: AnimationEvent) => {
        if (e.animationName.includes("hidden")) {
            callBackStartAnimation?.();
        }
    };

    return (
        <div
            style={
                {
                    "--time-animation-loader": `${timeAnimation}`,
                    ...style,
                } as React.CSSProperties
            }
            id={styles.defaultLoader}
            className={elementIsReady ? styles.startHidden : ""}
            onAnimationEnd={endAnimationHidden}
            onAnimationStart={startAnimation}
        >
            <section className={styles.over}>
                <IconS className={styles.iconS} />
                <IconP className={styles.iconP} />
                <section className={styles.divForIcons}>
                    <TextIconBrand className={styles.iconText} />
                </section>
            </section>
        </div>
    );
};
