import { FullOverlayModalsControl } from "@/stores/FullOverlayModalsControl";
import { WaitingUtils } from "@/stores/WaitingUtils";
import { useRef } from "react";
import { useOperationModal } from "../useOperationModal/useOperationModal";

export const useFooterModal = () => {
    const modalData = useRef(new FullOverlayModalsControl()).current;
    const utilsData = useRef(new WaitingUtils()).current;
    const data = useOperationModal(utilsData, modalData);

    return { modalData: data.modalData, utilsData: data.utilsData };
};
