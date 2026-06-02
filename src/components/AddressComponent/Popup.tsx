import { TematicalColorButton } from "@/components/button/TematicalColorButton/TematicalColorButton";
import { FairContainer } from "@/components/Fair/FairContainer";
import { OverlayForNodeContent } from "@/components/modals/OverlayForNodeContent/OverlayForNodeContent";
import { DefaultScrollBarScroll } from "@/components/scrollbar/DefaultScrollBarScroll/DefaultScrollBarScroll";
import { AddressType } from "@/lib/api/Addresses";
import { FairInterface, getFairsByIds } from "@/lib/api/Fairs";
import { FullOverlayModalsControl } from "@/stores/FullOverlayModalsControl";
import { WaitingUtils } from "@/stores/WaitingUtils";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Popup.module.css";

export const Popup = observer(
    ({
        modalData,
        utilsData,
        address,
    }: {
        modalData: FullOverlayModalsControl;
        utilsData: WaitingUtils;
        address: AddressType;
    }) => {
        const [fairs, setFairs] = useState<FairInterface[]>([]);

        useEffect(() => {
            async function getFairs() {
                utilsData.setWaiting(true);
                const fairs = await getFairsByIds(address.fairs_ids);
                setFairs(fairs?.fairs!);
                utilsData.setWaiting(false);
            }
            getFairs();
        }, [address]);

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
                            <span className="link-font">Связанные события</span>
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
                                {fairs.map((fair) => (
                                    <FairContainer key={fair.id} fair={fair} />
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
