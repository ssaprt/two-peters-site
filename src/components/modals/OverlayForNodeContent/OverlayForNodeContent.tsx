import { DefaultLoader } from "@/components/loaders/DefaultLoader/DefaultLoader";
import { useMounted } from "@/hooks/Utils/useMounted";
import { FullOverlayModalsControl } from "@/stores/FullOverlayModalsControl";
import { WaitingUtils } from "@/stores/WaitingUtils";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./OverlayForNodeContent.module.css";

interface OverlayForNodeContentProps {
    children: React.ReactNode | React.ReactNode[];
    modalData: FullOverlayModalsControl;
    utilsData: WaitingUtils;
    style?: React.CSSProperties;
}

export const OverlayForNodeContent = observer(
    ({ children, modalData, utilsData, style }: OverlayForNodeContentProps) => {
        const mounted = useMounted();
        const [readyMount, setReadyMount] = useState(true);
        const { clearModal } = modalData;
        const { openModal } = modalData;
        const [viewContent, setViewContent] = useState(false);
        const { clear } = utilsData;
        const { waiting } = utilsData;

        useEffect(() => {
            if (!openModal) {
                clear();
                clearModal();
                setViewContent(false);
            }
        }, [openModal]);

        const endAnimation = (e: React.AnimationEvent) => {
            if (e.animationName.includes("view")) {
                setViewContent(true);
            }
        };

        if (!openModal) return null;
        if (!mounted) return null;

        return createPortal(
            <div className={styles.dataEditWaiter}>
                <div
                    onAnimationEnd={endAnimation}
                    className={`${styles.bodyDataEdit} ${viewContent ? styles.view : ""}`}
                    style={style}
                >
                    {children}

                    {readyMount && (
                        <DefaultLoader
                            elementIsReady={!waiting}
                            callBackEndAnimation={() => setReadyMount(true)}
                        />
                    )}
                </div>
            </div>,
            document.body,
        );
    },
);
