import { random } from "lodash";
import { CSSProperties, useEffect, useState } from "react";
import styles from "./Accept.module.css";

interface AcceptProps {
    checked: boolean;
    title?: string;
    id: string | number;
    returnValue?: (value: boolean) => void;
    style?: {
        defaultColor?: string;
        activeColor?: string;
        defaultBorder?: string;
        activeBorder?: string;
        defaultBackground?: string;
        activeBackground?: string;
    };
}

export const Accept = ({
    checked = false,
    title = "",
    id = random(1, 1000000),
    returnValue,
    style,
}: AcceptProps) => {
    const [mounted, setMounted] = useState(false);

    const isStyles = {
        "--defaultColor": style?.defaultColor ?? "var(--global-neutral-color)",
        "--activeColor": style?.activeColor ?? "var(--success-color)",
        "--defaultBorder": style?.defaultBorder ?? "rgba(255, 255, 255, .13)",
        "--activeBorder": style?.activeBorder ?? "var(--success-color)",
        "--background": style?.defaultBackground ?? "var(--global-bg-color)",
    } as CSSProperties;

    useEffect(() => {
        //eslint-disable-next-line
        if (!mounted) setMounted(true);
    }, []);

    const pointsBorderDefault = "0,0 24,0 24,24 0,24 0,0";
    const pointsAccept = "4,13 9,18 20,6";

    return (
        <div className={styles.wrapper}>
            <input
                type="checkbox"
                id={`ACCEPT-${id}`}
                defaultChecked={checked}
                hidden
                onChange={(e) =>
                    setTimeout(() => {
                        returnValue?.(e.target.checked);
                    }, 300)
                }
            />
            <label
                style={isStyles}
                htmlFor={`ACCEPT-${id}`}
                className={`${styles.acceptLabel} ${!mounted && styles.hidden}`}
            >
                <svg className={styles.svg} viewBox="0 0 24 24">
                    <polyline
                        className={styles.border}
                        points={pointsBorderDefault}
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <polyline
                        className={styles.accept}
                        points={pointsAccept}
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <polyline
                        className={styles.borderAfter}
                        points={pointsBorderDefault}
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span>{title}</span>
            </label>
        </div>
    );
};
