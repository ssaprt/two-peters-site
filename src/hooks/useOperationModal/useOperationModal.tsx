// hooks/useOperationModal.ts
import { FullOverlayModalsControl } from "@/stores/FullOverlayModalsControl";
import { WaitingUtils } from "@/stores/WaitingUtils";
import { bindOperationModal } from "@/utils/bindOperationsModal";

export function useOperationModal<T>(
    utils: T,
    modal: FullOverlayModalsControl,
) {
    bindOperationModal(utils as WaitingUtils, modal);

    return {
        modalData: modal,
        utilsData: utils,
    };
}
