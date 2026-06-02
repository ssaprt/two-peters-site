import styles from "./MailBox.module.css";
import Outer from "@/components/loaders/DefaultLoader/out.svg?react";
import Inner from "@/components/loaders/DefaultLoader/inner.svg?react";
import React, { useRef } from "react";
import clsx from "clsx";
import { changesStore } from "@/stores/NotesStore";

export const MailBox = ({ next }: { next: boolean }) => {
  const refParent = useRef<HTMLDivElement>(null);

  const top = "0,0 75,55 85,55 160,0 0,0";
  const underTop = "0,0 80,50 160,0 0,0";
  const body = "0,0 0,100 160,100 160,0 80,50 0,0";
  const underTopInner = "0,0 80,50 160,0 80,46 0,0";

  const handleEndAnimation = (e: React.AnimationEvent) => {
    const an = e.animationName;

    if (an.includes("back")) {
      refParent.current?.classList.add(styles.stepOne);
    }

    if (an.includes("top")) {
      refParent.current?.classList.add(styles.stepThree);
    }
  };

  const handleAnimationStart = (e: React.AnimationEvent) => {
    const an = e.animationName;
    if (an.includes("seal")) {
      refParent.current?.classList.add(styles.stepTwo);
    }

    if (an.includes("down")) {
      refParent.current?.classList.add(styles.stepFour);
    }

    if (an.includes("size")) {
      changesStore.toggleEndView(true);
    }
  };

  return (
    <div
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={handleEndAnimation}
      className={clsx(styles.mailBox, next && styles.startBack)}
    >
      <div ref={refParent} className={styles.innerMailBox}>
        <div className={styles.bend}>
          <div className={styles.envelopeTop}>
            <svg className={styles.envelope} viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
              <polyline className={styles.top} points={top} />
            </svg>
          </div>

          <div className={styles.envelopeUnder}>
            <svg className={styles.envelope} viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
              <polyline className={styles.underTop} points={underTop} />
            </svg>
          </div>

          <div className={styles.messageDefault}></div>

          <div className={styles.envelopeBottom}>
            <svg className={styles.envelope} viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
              <polyline className={styles.body} points={body} />
              <line className={styles.lineShadow} x1="80" y1="50" x2="0" y2="100" />
              <line className={styles.lineShadow} x1="80" y1="50" x2="160" y2="100" />
              <polyline className={styles.underTopInner} points={underTopInner} />
            </svg>
          </div>

          <div className={styles.seal}>
            <Outer className={styles.outer} />
            <Inner className={styles.inner} />
          </div>
        </div>
      </div>
    </div>
  );
};
