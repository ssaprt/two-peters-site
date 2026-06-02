import { TematicalColorButton } from "@/components/button/TematicalColorButton/TematicalColorButton";
import { FairContainer } from "@/components/Fair/FairContainer";
import { OverlayForNodeContent } from "@/components/modals/OverlayForNodeContent/OverlayForNodeContent";
import { DefaultScrollBarScroll } from "@/components/scrollbar/DefaultScrollBarScroll/DefaultScrollBarScroll";
import { FairInterface, getFairsByIds } from "@/lib/api/Fairs";
import { Award, getAwardSrc } from "@/lib/api/Products";
import { FullOverlayModalsControl } from "@/stores/FullOverlayModalsControl";
import { WaitingUtils } from "@/stores/WaitingUtils";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Popup.module.css";

export const Popup = observer(
    ({
        modalData,
        utilsData,
        awards,
    }: {
        modalData: FullOverlayModalsControl;
        utilsData: WaitingUtils;
        awards: Award[];
    }) => {
        const [fairs, setFairs] = useState<FairInterface[]>([]);

        useEffect(() => {
            async function getFairs() {
                utilsData.setWaiting(true);
                const fairs = await getFairsByIds(
                    awards.map((award) => award.fair_id),
                );
                setFairs(fairs?.fairs!);
                utilsData.setWaiting(false);
            }
            getFairs();
        }, [awards]);

        const combined = awards.reduce<
            { fair: FairInterface; awards: Award[] }[]
        >((acc, award) => {
            const fair = fairs.find((f) => f.id === award.fair_id);
            if (!fair) return acc;

            const existing = acc.find((item) => item.fair.id === fair.id);
            if (existing) {
                existing.awards.push(award);
            } else {
                acc.push({ fair, awards: [award] });
            }
            return acc;
        }, []);

        return (
            modalData.openModal &&
            createPortal(
                <OverlayForNodeContent
                    style={{
                        width: "86%",
                        height: "90dvh",
                        maxWidth: "920px",
                    }}
                    utilsData={utilsData}
                    modalData={modalData}
                >
                    <div className={styles.popup}>
                        <div className={styles.topHeader}>
                            <span className="link-font">
                                Награды в событиях
                            </span>
                            <TematicalColorButton
                                onClick={() => modalData.isHide()}
                            >
                                Закрыть
                            </TematicalColorButton>
                        </div>
                        <div className={styles.overlayScroll}>
                            <div
                                className={styles.scrollBox}
                                data-lenis-prevent
                            >
                                {combined.map((group, i) => (
                                    <div className={styles.item} key={i}>
                                        <div className={styles.awardsGroup}>
                                            {group.awards.map((award, j) => (
                                                <div
                                                    className={styles.award}
                                                    key={j}
                                                >
                                                    <Image
                                                        className={
                                                            styles.imgAward
                                                        }
                                                        style={{
                                                            objectFit:
                                                                "contain",
                                                            width: 60,
                                                            height: 60,
                                                        }}
                                                        width={0}
                                                        height={0}
                                                        sizes="100vw"
                                                        src={getAwardSrc(award)}
                                                        alt={`Награда ${award.name} в событии ${group.fair.title_article}`}
                                                    />
                                                    <span className="tag-font text-[14px] md:text-[14px] lg:text-[16px]">
                                                        {award.name} - награда в
                                                        событии{" "}
                                                        {
                                                            group.fair
                                                                .title_article
                                                        }
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={styles.fair}>
                                            <FairContainer fair={group.fair} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <DefaultScrollBarScroll />
                        </div>
                    </div>
                </OverlayForNodeContent>,
                document.body,
            )
        );
    },
);
