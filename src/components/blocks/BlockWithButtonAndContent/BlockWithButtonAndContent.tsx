//* IMPORTS ---------------------------------------------------------------------*
import { useAppContext } from "@/app/context/AppContext";
import { useInfoScroll } from "@/hooks/Scrollbar/useInfoScroll";

import { scrollManager } from "@/stores/ScrollManager";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import styles from "./BlockWithButtonAndContent.module.css";
//* IMPORTS ---------------------------------------------------------------------*

//? TYPES -----------------------------------------------------------------------*
type Props = {
    button?: {
        button: React.ReactNode;
        indexBlockToScroll: number;
        style?: React.CSSProperties;
    };
    children?: React.ReactNode;
};
//? TYPES -----------------------------------------------------------------------*

export const BlockWithButtonAndContent = observer(
    ({ button, children }: Props) => {
        //TODO STATES -----------------------------------------------------------*
        const refButton = useRef<HTMLDivElement>(null);
        const refBlock = useRef<HTMLDivElement>(null);
        const { isMobile } = useAppContext();
        //* работа с анимацией
        const { mounted, getSectionProgressForAnim } = useInfoScroll();
        //* видимость секции
        //TODO STATES -----------------------------------------------------------*

        //? EFFECTS -------------------------------------------------------------*
        useEffect(() => {
            if (!mounted) return;

            const y = getSectionProgressForAnim({
                start: 0.5,
                end: 0.6,
                section: refBlock.current,
                howMatchForAnim: 1,
            });

            if (refBlock.current) {
                refBlock.current.style.setProperty("--progress", `${y}`);
            }
        }, [mounted, getSectionProgressForAnim]);

        //? EFFECTS -------------------------------------------------------------*

        //* COMPUTED ------------------------------------------------------------*
        const toIndex = scrollManager.scrollToIndex;
        //* COMPUTED ------------------------------------------------------------*

        //! JSX -----------------------------------------------------------------*
        return (
            <div ref={refBlock} className={styles.block}>
                <div className={styles.absluteBackPlate}>{children}</div>
                {button && (
                    <div
                        ref={refButton}
                        onClick={() => toIndex(button.indexBlockToScroll)}
                        className={!button.style ? styles.button : ""}
                        style={{ ...button.style }}
                    >
                        {button.button}
                    </div>
                )}
            </div>
        );
        //! JSX -----------------------------------------------------------------*
    },
);
