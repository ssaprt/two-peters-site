import { useAppContext } from "@/app/context/AppContext";
import Close from "@/assets/icons/common/close-sign.svg";
import Open from "@/assets/icons/common/open-sign.svg";
import { DayTypes } from "@/lib/api/Addresses";
import { observer } from "mobx-react-lite";
import styles from "./AddressComponent.module.css";

interface BunnerProps {
    timezone: string;
    days: DayTypes[];
}

export const Bunner = observer(({ timezone, days }: BunnerProps) => {
    const { timeStore } = useAppContext();
    if (!timeStore.getTime) return null;
    const openNow = timeStore.isOpenNow(days, timezone, timeStore.getTime);

    return (
        <>
            <svg
                width="0"
                height="0"
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    pointerEvents: "none",
                }}
            >
                <defs>
                    <filter
                        id="closeShadow"
                        x="-10%"
                        y="-10%"
                        width="120%"
                        height="120%"
                    >
                        <feMorphology
                            in="SourceAlpha"
                            operator="dilate"
                            radius="0.8"
                            result="expanded"
                        />
                        <feFlood floodColor="black" result="black" />
                        <feComposite
                            in="black"
                            in2="expanded"
                            operator="in"
                            result="outline"
                        />
                        <feDropShadow
                            dx="1"
                            dy="1"
                            stdDeviation="0.5"
                            floodColor="currentColor"
                            floodOpacity="0.9"
                            in="SourceGraphic"
                            result="volume"
                        />
                        <feMerge>
                            <feMergeNode in="outline" />
                            <feMergeNode in="volume" />
                        </feMerge>
                    </filter>

                    <filter
                        id="openShadow"
                        x="-10%"
                        y="-10%"
                        width="120%"
                        height="120%"
                    >
                        <feMorphology
                            in="SourceAlpha"
                            operator="dilate"
                            radius="0.8"
                            result="expanded"
                        />
                        <feFlood floodColor="black" result="black" />
                        <feComposite
                            in="black"
                            in2="expanded"
                            operator="in"
                            result="outline"
                        />
                        <feDropShadow
                            dx="1"
                            dy="1"
                            stdDeviation="0.5"
                            floodColor="currentColor"
                            floodOpacity="0.9"
                            in="SourceGraphic"
                            result="volume"
                        />
                        <feMerge>
                            <feMergeNode in="outline" />
                            <feMergeNode in="volume" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            <div className={styles.bunner}>
                {!openNow ? (
                    <Close className={`${styles.svg} ${styles.close}`} />
                ) : (
                    <Open className={`${styles.svg} ${styles.open}`} />
                )}
            </div>
        </>
    );
});
