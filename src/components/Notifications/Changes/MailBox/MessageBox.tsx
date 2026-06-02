import { observer } from "mobx-react-lite";
import styles from "./MailBox.module.css";
import { changesStore } from "@/stores/NotesStore";
import { Item } from "@/pages/AdminPanel/NotePatches/Item";
import { DefaultScrollBarScroll } from "@/components/scrollbar/DefaultScrollBarScroll/DefaultScrollBarScroll";
import { TematicalColorButton } from "@/components/button/TematicalColorButton/TematicalColorButton";
import clsx from "clsx";
import React from "react";

export const MessageBox = observer(({ endView }: { endView: boolean }) => {
  const handleEndAnim = (e: React.AnimationEvent) => {
    if (e.animationName.includes("end")) {
      changesStore.toggleFinalView(true);
    }
  };
  return (
    <div onAnimationEnd={handleEndAnim} className={clsx(styles.messagesBox, endView && styles.active)}>
      {changesStore.final && (
        <>
          <div className={styles.header}>
            <span>Система уведомлений</span>
            <TematicalColorButton onClick={() => changesStore.setOffHaveData()}>Закрыть</TematicalColorButton>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.scroll}>
              {changesStore.notes.map((item) => (
                <Item editMode={false} key={item.id} item={item} />
              ))}
            </div>
            <DefaultScrollBarScroll />
          </div>
        </>
      )}
    </div>
  );
});
