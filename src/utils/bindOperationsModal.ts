import { reaction } from "mobx";
import { WaitingUtils } from "@/stores/WaitingUtils";
import { FullOverlayModalsControl } from "@/stores/FullOverlayModalsControl";

export function bindOperationModal(utils: WaitingUtils, modal: FullOverlayModalsControl) {
  reaction(
    () => ({
      waiting: utils.waiting,
      success: utils.success,
      error: utils.error,
    }),
    ({ waiting, success, error }) => {
      if (!waiting && (success || error)) {
        modal.startHide();
      }
    }
  );

  reaction(
    () => modal.open,
    (open) => {
      if (!open) {
        utils.viewResultAfterLoader = true;
        utils.clear();
      }
    }
  );
}
