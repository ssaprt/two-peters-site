//* IMPORTS -----------------------------------------------------------------------------*
import { useAppContext } from "@/app/context/AppContext";
import TPN from "@/assets/icons/logo/two-peters-name.svg";
import TPNS from "@/assets/icons/logo/two-peters-sub.svg";
import { useInfoScroll } from "@/hooks/Scrollbar/useInfoScroll";
import { observer } from "mobx-react-lite";
import { CSSProperties } from "react";
import styles from "./Logo.module.css";
//* IMPORTS -----------------------------------------------------------------------------*

export const TwoPetersName = observer(() => {
    //* STATES ***************************************************************************
    //? получаем информацию о прогрессе прокрутки + хук монтирвоания
    const { getProgressForAnim } = useInfoScroll();

    //? Версия для пк\мобильного isMobile - true
    //? получаем информации о состоянии фиксированного хедера
    const { isMobile, fixedHeader } = useAppContext();
    //* STATES ***************************************************************************

    //* EFFECTS **************************************************************************
    let top: number;
    if (!fixedHeader) {
        const isTop = isMobile ? 160 : 200;
        const res = getProgressForAnim({
            howMatchForAnim: isTop,
            start: isMobile ? 40 : 0,
        });
        top = (res === isTop ? 0 : isTop - res) - (isMobile ? 38.75 : 35);
    } else {
        top = isMobile ? 160 - 38.75 : 200 - 35;
    }

    let w: number;
    if (!fixedHeader) {
        w = getProgressForAnim({
            start: isMobile ? 40 : 0,
            howMatchForAnim: isMobile ? 240 : 300,
        });
    } else {
        w = 0;
    }

    let h: number;
    if (!fixedHeader) {
        h = getProgressForAnim({
            start: isMobile ? 40 : 0,
            howMatchForAnim: 90,
        });
    } else {
        h = 0;
    }

    let wSub: number;
    if (!fixedHeader) {
        wSub = getProgressForAnim({
            start: isMobile ? 40 : 0,
            howMatchForAnim: isMobile ? 200 : 240,
        });
    } else {
        wSub = 0;
    }

    let hSub: number;
    if (!fixedHeader) {
        hSub = getProgressForAnim({
            start: isMobile ? 40 : 0,
            howMatchForAnim: 30,
        });
    } else {
        hSub = 0;
    }

    //* EFFECTS **************************************************************************

    //* JSX ******************************************************************************
    return (
        <div
            className={styles.twoPetersBottom}
            style={{ "--top": `${top}px` } as CSSProperties}
        >
            <TPN
                style={{
                    "--w": `${w}px`,
                    "--h": `${h}px`,
                }}
                className={styles.twoPetersName}
            />
            <TPNS
                className={styles.twoPetersSub}
                style={
                    {
                        "--wSub": `${wSub}px`,
                        "--hSub": `${hSub}px`,
                    } as CSSProperties
                }
            />
        </div>
    );
});
//* JSX ******************************************************************************
