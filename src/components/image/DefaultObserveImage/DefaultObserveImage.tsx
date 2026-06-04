"use client";

import { DefaultLoader } from "@/components/loaders/DefaultLoader/DefaultLoader";
import { PreviewerImg } from "@components/preview/PreviewerImg/PreviewerImg";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./DefaultObserveImage.module.css";

interface Props {
    src_image: string;
    fallbackSrc?: string;
    alt?: string;

    image?: {
        contain?: boolean;
        priority?: boolean;
        preview?: boolean;
        backSetLoad?: () => void;
        backSetOnLoad?: () => void;
    };

    video?: {
        controls?: boolean;
        contain?: boolean;
        muted?: boolean;
        preload?: "none" | "metadata" | "auto";
        priority?: boolean;
        preview?: boolean;
    };
    fixedHeight?: number;
}

export const DefaultObserveImage = ({
    src_image,
    fallbackSrc,
    alt = "",
    image,
    video,
    fixedHeight,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const DEFAULT_FALLBACK = "/images/no-image.webp";
    const fallbackImage = fallbackSrc || DEFAULT_FALLBACK;

    const [currentSrc, setCurrentSrc] = useState(src_image);
    const [viewPreview, setViewPreview] = useState(false);
    const loadIdRef = useRef(0);
    const ratioCache = useRef<Map<string, number>>(new Map());

    const [visible, setVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [ratio, setRatio] = useState<number | null>(
        ratioCache.current.get(src_image) || null,
    );
    const [hideLoader, setHideLoader] = useState(false);
    const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
    const [containerSize, setContainerSize] = useState<{
        w: number;
        h: number;
    } | null>(null);

    const previewEnabled = image?.preview ?? true;
    const isLocalSrc = src_image?.startsWith("blob:");
    const isVisible = visible || isLocalSrc;
    const isLoading = isVisible && !loaded && !error;

    /*
     * ResizeObserver
     */
    useEffect(() => {
        if (!containerRef.current) return;
        const ro = new ResizeObserver(([entry]) => {
            const el = entry.target as HTMLElement;
            const parent = el.parentElement;
            const maxH = parent
                ? parseFloat(getComputedStyle(parent).maxHeight)
                : NaN;
            setContainerSize({
                w: entry.contentRect.width,
                h: isNaN(maxH) ? 0 : maxH,
            });
        });
        ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, []);

    /*
     * Вычисляем размер медиа
     */
    const computedSize = useMemo(() => {
        if (!ratio || !containerSize) {
            return { width: "100%", aspectRatio: "16/9" };
        }

        if (fixedHeight && ratio) {
            return {
                width: `${fixedHeight * ratio}px`,
                height: `${fixedHeight}px`,
            };
        }
        if (!ratio || !containerSize) {
            return { width: "100%", aspectRatio: "16/9" };
        }

        const maxW = containerSize.w;
        const maxH = containerSize.h > 0 ? containerSize.h : Infinity; // ← защита

        let w = maxW;
        let h = w / ratio;

        if (h > maxH) {
            h = maxH;
            w = h * ratio;
        }

        return {
            width: `${w}px`,
            height: `${h}px`,
        };
    }, [ratio, containerSize]);

    /*
     * intersection observer
     */
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                if (videoRef.current) {
                    videoRef.current.play().catch(() => {});
                }
            } else {
                if (videoRef.current) videoRef.current.pause();
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    /*
     * reset states on src change
     */
    useEffect(() => {
        loadIdRef.current++;
        setLoaded(false);
        setError(false);
        setHideLoader(false);
        setMediaType(null);
        setRatio(ratioCache.current.get(src_image) || null);
    }, [src_image]);

    useEffect(() => {
        setCurrentSrc(src_image);
    }, [src_image]);

    /*
     * detect media type
     */
    useEffect(() => {
        if (!src_image) return;

        if (src_image.startsWith("data:video")) {
            setMediaType("video");
            return;
        }

        const ext = src_image.split(".").pop()?.toLowerCase();
        if (["mp4", "webm", "mov"].includes(ext || "")) {
            setMediaType("video");
            return;
        }

        if (src_image.startsWith("blob:")) {
            const tempVideo = document.createElement("video");
            tempVideo.preload = "metadata";
            tempVideo.src = src_image;
            tempVideo.onloadedmetadata = () => setMediaType("video");
            tempVideo.onerror = () => setMediaType("image");
            return;
        }

        setMediaType("image");
    }, [src_image]);

    /*
     * preload image ratio
     */
    useEffect(() => {
        if (!currentSrc || mediaType !== "image") return;
        if (ratioCache.current.has(currentSrc)) {
            setRatio(ratioCache.current.get(currentSrc)!);
            return;
        }
        const img = new window.Image();
        img.src = currentSrc;
        img.onload = () => {
            if (img.naturalWidth && img.naturalHeight) {
                const newRatio = img.naturalWidth / img.naturalHeight;
                ratioCache.current.set(currentSrc, newRatio);
                setRatio(newRatio);
            }
        };
    }, [currentSrc, mediaType]);

    /*
     * preload video ratio
     */
    useEffect(() => {
        if (!currentSrc || mediaType !== "video") return;
        if (ratioCache.current.has(currentSrc)) {
            setRatio(ratioCache.current.get(currentSrc)!);
            return;
        }
        const vid = document.createElement("video");
        vid.preload = "metadata";
        vid.src = currentSrc;
        vid.onloadedmetadata = () => {
            if (vid.videoWidth && vid.videoHeight) {
                const newRatio = vid.videoWidth / vid.videoHeight;
                ratioCache.current.set(currentSrc, newRatio);
                setRatio(newRatio);
            }
        };
    }, [currentSrc, mediaType]);

    /*
     * cleanup video
     */
    useEffect(() => {
        return () => {
            if (videoRef.current) {
                const vid = videoRef.current;
                vid.pause();
                vid.removeAttribute("src");
                vid.load();
            }
        };
    }, []);

    const handleImageLoad = () => {
        setLoaded(true);
        image?.backSetOnLoad?.();
    };

    const handleVideoMeta = () => {
        setLoaded(true);
    };

    const handleError = () => {
        if (currentSrc === fallbackImage) {
            setError(true);
            return;
        }
        setCurrentSrc(fallbackImage);
    };

    const handlePreview = () => {
        if (previewEnabled && mediaType === "image") setViewPreview(true);
    };

    const videoMuted = video?.muted ?? true;
    const videoPreload = video?.priority
        ? "auto"
        : (video?.preload ?? "metadata");

    return (
        <>
            <div ref={containerRef} className={styles.wrapper}>
                <div
                    onClick={handlePreview}
                    className={styles.divImg}
                    style={{
                        ...computedSize,
                        cursor:
                            previewEnabled &&
                            hideLoader &&
                            mediaType === "image"
                                ? `var(--cursor-1), zoom-in`
                                : "default",
                    }}
                >
                    {!isVisible && <div className={styles.placeholder} />}

                    {mediaType === null && isVisible && (
                        <DefaultLoader elementIsReady={false} />
                    )}

                    {!error && mediaType === "image" && (
                        <Image
                            src={currentSrc}
                            alt={alt}
                            width={1920}
                            height={1080}
                            sizes="100vw"
                            priority={image?.priority}
                            unoptimized={
                                src_image.startsWith("blob:") ||
                                src_image.startsWith("data:")
                            }
                            onLoad={handleImageLoad}
                            onError={handleError}
                            className={`${styles.media} ${loaded ? styles.ready : ""}`}
                            style={{
                                objectFit:
                                    image?.contain === false
                                        ? "cover"
                                        : "contain",
                            }}
                        />
                    )}

                    {isVisible && !error && mediaType === "video" && (
                        <video
                            ref={videoRef}
                            key={src_image}
                            src={src_image}
                            muted={videoMuted}
                            autoPlay
                            loop
                            playsInline
                            controls={video?.controls}
                            preload={videoPreload}
                            onLoadedMetadata={handleVideoMeta}
                            onError={handleError}
                            className={`${styles.media} ${loaded ? styles.ready : ""}`}
                            style={{
                                objectFit:
                                    video?.contain === false
                                        ? "cover"
                                        : "contain",
                            }}
                        />
                    )}

                    {!hideLoader && isVisible && mediaType !== null && (
                        <DefaultLoader
                            elementIsReady={!isLoading}
                            callBackEndAnimation={() => {
                                setHideLoader(true);
                            }}
                            callBackStartAnimation={() => {
                                image?.backSetLoad?.();
                            }}
                        />
                    )}

                    {error && <div className={styles.error} />}
                </div>
            </div>

            {viewPreview && (
                <PreviewerImg
                    src={currentSrc}
                    backClick={() => setViewPreview(false)}
                />
            )}
        </>
    );
};
