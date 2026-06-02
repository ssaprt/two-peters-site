import Current from "@/assets/icons/fairs/current.svg";
import BeforeAfter from "@/assets/icons/fairs/end.svg";
import { FairContainer } from "@/components/Fair/FairContainer";
import { HrBlocks } from "@/components/hr/HrBlocks/HrBlocks";
import { TitleSection } from "@/components/titles/TitleWithLogo/TitleSection";
import { FairInterface } from "@/lib/api/Fairs";
import { normalizeRangeDate } from "@/utils/normalizeRangeDate";
import clsx from "clsx";
import React from "react";
import styles from "./FairsOverlay.module.css";

export const FairsOverlay = ({ fairs }: { fairs: FairInterface[] }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.lWrap}>
                <div
                    className={styles.l}
                    data-lenis-prevent
                    data-lenis-prevent-wheel
                    data-lenis-prevent-touch
                >
                    {fairs.map((fair, i) => {
                        let icon: React.ReactNode;
                        switch (
                            normalizeRangeDate(fair.date_start, fair.date_end)
                                .status
                        ) {
                            case "end":
                                icon = (
                                    <BeforeAfter
                                        data-tooltip="Завершено"
                                        data-bgcolor="#b4b4b4"
                                        key={`${fair.id}${i}`}
                                        className={clsx(
                                            styles.icon,
                                            styles.before,
                                        )}
                                    />
                                );
                                break;
                            case "current":
                                icon = (
                                    <Current
                                        data-tooltip="В разгаре"
                                        data-bgcolor="var(--success-color)"
                                        key={`${fair.id}${i}`}
                                        className={clsx(
                                            styles.icon,
                                            styles.current,
                                        )}
                                    />
                                );
                                break;
                            case "new":
                                icon = (
                                    <BeforeAfter
                                        data-tooltip="Еще не началось"
                                        data-bgcolor="var(--global-color-link)"
                                        key={`${fair.id}${i}`}
                                        className={clsx(
                                            styles.icon,
                                            styles.new,
                                        )}
                                    />
                                );
                                break;
                        }
                        return icon;
                    })}
                </div>
            </div>
            <div className={styles.r}>
                <TitleSection title="События two-peters" />
                {fairs.map((fair) => (
                    <React.Fragment key={fair.id}>
                        <FairContainer fair={fair} />
                        <HrBlocks />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
