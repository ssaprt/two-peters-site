//* IMPORTS --------------------------------------------------------------------------*
import { useAppContext } from "@/app/context/AppContext";
import { layoutStore } from "@/stores/LayoutStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./VideoFullBlock.module.css";
//* IMPORTS --------------------------------------------------------------------------*

//? TYPES ----------------------------------------------------------------------------*
type Props = {
    readyVideo: boolean;
    visibleVideo: boolean;
    canPlayIfVisibleTrue: () => void;
};
//? TYPES ----------------------------------------------------------------------------*

export const PosterIsReady = ({
    readyVideo,
    visibleVideo,
    canPlayIfVisibleTrue,
}: Props) => {
    //TODO STATES --------------------------------------------------------------------*
    //* размонтируем постер
    const [unMountImageForPoster, setUnmountImageForPoster] = useState(false);
    const [readyUnmount, setReadyUnmount] = useState(false);
    //* получаем информацию, мобильный или десктоп
    const { isMobile } = useAppContext();
    //* получаем постер
    const poster = `/uploads/video_pages/poster/${isMobile ? "mobile" : "desktop"}/poster.png`;
    //TODO STATES --------------------------------------------------------------------*

    //* FNS --------------------------------------------------------------------------*
    //? 1) обрабатываем завершение анимации
    const handleEndAnimation = (e: React.AnimationEvent) => {
        if (e.animationName.includes("startHide")) {
            setReadyUnmount(true);
            //?  колбек
            canPlayIfVisibleTrue();
        }
    };
    //* FNS --------------------------------------------------------------------------*

    //TODO EFFECTS -------------------------------------------------------------------*
    //? 0) добавляем в предзагрузку страницы элемент
    useEffect(() => {
        layoutStore.addLoadElement("poster");
    }, []);

    //? 1) обрабатываем готовность размонтирования и возврата колбэка
    useEffect(() => {
        //* если не готовы - выходим
        if (!readyVideo || !visibleVideo) return;
        setUnmountImageForPoster(true);
    }, [visibleVideo, readyVideo]);
    //TODO EFFECTS -------------------------------------------------------------------*

    //! JSX --------------------------------------------------------------------------*
    return !readyUnmount ? (
        <div className={styles.poster}>
            <Image
                className={unMountImageForPoster ? styles.startHide : ""}
                onAnimationEnd={handleEndAnimation}
                alt="Два Петра. Крымские вина. Two Peters. Винодельня восточного Крыма. Невероятный цикл событий, ярмарок и мероприятий"
                width={100}
                height={100}
                src={poster}
                priority
                unoptimized
                onLoad={() => layoutStore.setLoadElement("poster")}
            />
        </div>
    ) : null;
    //! JSX --------------------------------------------------------------------------*
};
