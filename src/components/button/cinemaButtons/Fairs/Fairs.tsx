import Drop from "@/assets/icons/common/drop.svg";
import FairIconn from "@/assets/icons/common/fairs-without-inner.svg";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import styles from "./Fairs.module.css";

export const Fairs = () => {
    const animRef = useRef(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        const anim = animRef.current! as SVGAnimateElement;

        const onBegin = () => {
            setStart(true);
        };

        anim.addEventListener("beginEvent", onBegin);

        anim.beginElement();

        return () => {
            anim.removeEventListener("beginEvent", onBegin);
        };
    }, []);

    return (
        <div className={clsx(styles.container, start ? styles.start : "")}>
            <FairIconn className={styles.icon} />
            <div className={styles.blob}>
                <svg
                    viewBox="0 0 100 100"
                    style={{
                        animationDelay: "0.2s",
                    }}
                >
                    {/* маска круга */}
                    <defs>
                        <clipPath id="clip">
                            <circle cx="50" cy="50" r="48" />
                        </clipPath>
                    </defs>

                    {/* всё внутри круга */}
                    <g clipPath="url(#clip)">
                        {/* падающая капля */}
                        <ellipse
                            className={styles.drop}
                            cx="50"
                            cy="50"
                            rx="4"
                            ry="6"
                        >
                            {/* падение */}
                            <animate
                                attributeName="cy"
                                values="50;88;92;92"
                                keyTimes="0;0.4;0.5;1"
                                dur="4s"
                                begin="0s"
                                fill="remove"
                                restart="always"
                                calcMode="linear"
                                repeatCount="indefinite"
                            />

                            {/* расплющивание */}
                            <animate
                                attributeName="rx"
                                values="4;5;2;16"
                                keyTimes="0;0.4;0.5;1"
                                dur="4s"
                                begin="0s"
                                fill="remove"
                                restart="always"
                                calcMode="linear"
                                repeatCount="indefinite"
                            />

                            <animate
                                attributeName="ry"
                                values="4;8;2;2"
                                keyTimes="0;0.4;0.5;1"
                                dur="4s"
                                begin="indefinite"
                                fill="remove"
                                restart="always"
                                calcMode="linear"
                                repeatCount="indefinite"
                                ref={animRef}
                            />

                            {/* исчезновение */}
                            <animate
                                attributeName="opacity"
                                values="1;1;0;0"
                                keyTimes="0;0.5;0.51;1"
                                dur="4s"
                                begin="0s"
                                fill="remove"
                                restart="always"
                                calcMode="linear"
                                repeatCount="indefinite"
                            />
                        </ellipse>
                    </g>
                </svg>
            </div>
            <Drop className={styles.dropDown} />
        </div>
    );
};
