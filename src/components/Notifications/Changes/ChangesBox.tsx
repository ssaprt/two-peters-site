import { observer } from "mobx-react-lite";
import styles from "./ChangesBox.module.css";
import { createPortal } from "react-dom";
import { MailBox } from "./MailBox/MailBox";
import React, { useState } from "react";
import { changesStore } from "@/stores/NotesStore";
import { MessageBox } from "./MailBox/MessageBox";

export const ChangesBox = observer(() => {
  const [next, setNext] = useState(false);
  const handleEndAnimation = (e: React.AnimationEvent) => {
    if (e.animationName.includes("box")) {
      setNext(true);
    }
  };

  return changesStore.haveData
    ? createPortal(
        <div className={styles.box} onAnimationEnd={handleEndAnimation}>
          <MailBox next={next} />
          <MessageBox endView={changesStore.endView} />
        </div>,
        document.body,
      )
    : null;
});
