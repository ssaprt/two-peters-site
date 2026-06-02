"use client";
//* IMPORTS -----------------------------------------------------------------------------*
import { useAppContext } from "@/app/context/AppContext";
import { useSectionVisibility } from "@/hooks/Scrollbar/useSectionVisibility";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { PosterIsReady } from "./PosterIsReady";
import styles from "./VideoFullBlock.module.css";
//* IMPORTS -----------------------------------------------------------------------------*

//? TYPES -------------------------------------------------------------------------------*
type Props = {
    src: string;
    id: string;
    minBufferedSeconds?: number;
    children?: React.ReactNode;
};
//? TYPES -------------------------------------------------------------------------------*

export const VideoFullBlock = observer(
    ({ src, id, minBufferedSeconds = 3, children }: Props) => {
        //TODO STATES -------------------------------------------------------------------*
        const { isMobile } = useAppContext();
        //* Готов ли к показу после указанного количества секунд
        const [ready, setReady] = useState(false);
        //* можно ли запускать проигрывание
        const [canPlay, setCanPlay] = useState(false);
        //* без вопросов)
        const videoRef = useRef<HTMLVideoElement>(null);
        //* проверка видимости родительского блока [progress: number, visible: boolean]
        const visible = useSectionVisibility(id);
        //* Пауза (вне просмотра)
        const paused = !visible.visible && visible.progress < 0.05;
        const [videoKey, setVideoKey] = useState(0);
        //TODO STATES -------------------------------------------------------------------*

        //? EFFECTS ---------------------------------------------------------------------*
        //? 1) обрабатываем прогресс загрузки
        useEffect(() => {
            //* ссылка на дом-элемент
            const video = videoRef.current;
            //* выходим из эффекта если элемента нет
            if (!video) return;

            //* чекаем буфер.....
            const checkBuffer = () => {
                if (!video.buffered.length) return;

                try {
                    const bufferedEnd = video.buffered.end(
                        video.buffered.length - 1,
                    );

                    //* достаточное количество секунд загружено
                    if (bufferedEnd >= minBufferedSeconds) {
                        setReady(true);
                        video.removeEventListener("progress", checkBuffer);
                    }
                } catch {
                    return;
                }
            };

            checkBuffer();

            //* events
            video.addEventListener("progress", checkBuffer);
            video.addEventListener("canplay", checkBuffer);

            //* unmount
            return () => {
                video.removeEventListener("progress", checkBuffer);
                video.removeEventListener("canplay", checkBuffer);
            };
        }, [minBufferedSeconds, visible.visible]);

        //? 2) Работаем с паузой
        useEffect(() => {
            const video = videoRef.current;
            if (!video || !canPlay) return;
            if (paused) video.pause();
            else
                video.play().catch((e) => {
                    console.warn("Video play failed", e);
                });
        }, [paused, canPlay]);

        useEffect(() => {
            const handlePageShow = (e: PageTransitionEvent) => {
                if (e.persisted) {
                    setReady(false);
                    setCanPlay(false);
                    setVideoKey((prev) => prev + 1);
                }
            };
            window.addEventListener("pageshow", handlePageShow);
            return () => window.removeEventListener("pageshow", handlePageShow);
        }, []);
        //? EFFECTS ---------------------------------------------------------------------*

        //! JSX -------------------------------------------------------------------------*
        return (
            <div className={styles.fullVideoBlock}>
                <PosterIsReady
                    key={videoKey}
                    readyVideo={ready}
                    visibleVideo={visible.visible}
                    canPlayIfVisibleTrue={() => setCanPlay(true)}
                />

                <div className={styles.content}>{children}</div>
                <video
                    webkit-playsinline="true"
                    x-webkit-airplay="allow"
                    preload={isMobile ? "metadata" : "auto"}
                    ref={videoRef}
                    muted
                    loop
                    autoPlay
                    playsInline
                >
                    <source src={src} type="video/mp4" />
                </video>
            </div>
        );
        //! JSX -------------------------------------------------------------------------*
    },
);
