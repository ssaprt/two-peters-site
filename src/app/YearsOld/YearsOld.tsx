import AcceptIcon from "@/assets/icons/common/accept.svg";
import StopIcon from "@/assets/icons/common/stop.svg";
import { ButtonWithSvg } from "@/components/button/buttonWithSvg/buttonWithSvg";
import { TitleSection } from "@/components/titles/TitleWithLogo/TitleSection";
import { useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./YearsOld.module.css";

export const YearsOld = ({ onConfirm }: { onConfirm: () => void }) => {
    const refOverlay = useRef<HTMLDivElement>(null);
    const handleEndAnimation = (e: React.AnimationEvent) => {
        if (e.animationName.includes("fade")) {
            onConfirm();
        }
    };
    return createPortal(
        <div
            className={styles.overlayAge}
            onAnimationEnd={handleEndAnimation}
            ref={refOverlay}
        >
            <div className={styles.bodyAge}>
                <TitleSection
                    title="Вам уже исполнилось восемнадцать?"
                    style={{ textAlign: "center", fontSize: "24px" }}
                />
                <div className={styles.buttons}>
                    <ButtonWithSvg
                        onClick={() =>
                            refOverlay.current?.classList.add(styles.fade)
                        }
                        icon={<AcceptIcon />}
                        title="Да"
                        subtitle="Войти"
                        styleIcon={{ transform: "rotate(0deg) scale(0.9)" }}
                    />
                    <ButtonWithSvg
                        onClick={() => {
                            window.location.href =
                                "https://www.google.com/search?q=%D0%B8%D0%B3%D1%80%D0%B0+%D0%B3%D1%83%D0%B3%D0%BB&num=10&newwindow=1&sca_esv=13664839709b14a6&sxsrf=ANbL-n6rVN5iG2STVrQdb-9nlKcIFUo89A%3A1780393424207&ei=0KUeapetDKipxc8P0NCRoQo&biw=1536&bih=695&ved=0ahUKEwiX1fCsouiUAxWoVPEDHVBoJKQQ4dUDCBA&uact=5&oq=%D0%B8%D0%B3%D1%80%D0%B0+%D0%B3%D1%83%D0%B3%D0%BB&gs_lp=Egxnd3Mtd2l6LXNlcnAiEdC40LPRgNCwINCz0YPQs9C7MgUQABiABDIFEAAYgAQyBRAAGIAEMgUQLhiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEj5C1AAWNEJcAB4AZABAJgBkwGgAasJqgEDMC45uAEDyAEA-AEBmAIJoALVCcICChAjGIAEGIoFGCfCAgoQLhiABBiKBRhDwgIKEAAYgAQYigUYQ8ICBBAjGCfCAhQQLhiABBiXBRjcBBjeBBjgBNgBAZgDALoGBggBEAEYFJIHAzAuOaAHn32yBwMwLjm4B9UJwgcFMC4xLjjIByCACAE&sclient=gws-wiz-serp ";
                        }}
                        icon={<StopIcon />}
                        title="Нет"
                        subtitle="Уйти"
                        styleIcon={{ transform: "rotate(0deg) scale(0.9)" }}
                    />
                </div>
            </div>
        </div>,
        document.body,
    );
};
