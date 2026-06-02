import { createPortal } from "react-dom";
import styles from "./DataEditWaiter.module.css";
import { useEffect } from "react";
import { DefaultLoader } from "@/components/loaders/DefaultLoader/DefaultLoader";
import { observer } from "mobx-react-lite";
import { UserUtils } from "@/stores/UserStore";
import { Success } from "@/components/messages/success/Success";
import { Error } from "@/components/messages/error/Error";

export const DataEditWaiter = observer(({ modalData, userData }: { modalData: any; userData: UserUtils }) => {
  const { startHide, clearTimer, isHide } = modalData;
  const { openModal, messageModal } = modalData;

  if (!modalData.isOpen) {
    return null;
  }

  useEffect(() => {
    return () => clearTimer();
  }, []);

  if (!openModal) return null;

  return createPortal(
    <div className={styles.dataEditWaiter}>
      <section className={styles.bodyDataEdit}>
        {userData.success ? (
          <Success isHandler={isHide}>{messageModal}</Success>
        ) : (
          <Error isHandler={isHide}>{messageModal}</Error>
        )}

        <DefaultLoader elementIsReady={openModal} callBackEndAnimation={startHide} />
      </section>
    </div>,
    document.getElementById("root")!
  );
});
