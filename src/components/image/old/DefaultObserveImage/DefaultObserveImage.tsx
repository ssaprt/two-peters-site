import { useEffect, useRef, useState } from "react";
import styles from "./DefaultObserveImage.module.css";
import { DefaultLoader } from "@/components/loaders/DefaultLoader/DefaultLoader";
import { PreviewerImg } from "@/components/preview/PreviewerImg/PreviewerImg";

interface Props {
  src_image: string;
  alt?: string;
  preview?: boolean;
}

export const DefaultObserveImage = ({ src_image, alt = "", preview = true, ...props }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [viewPreview, setViewPreview] = useState(false);

  const loadIdRef = useRef(0);

  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [ratio, setRatio] = useState<number | null>(null);
  const [hideLoader, setHideLoader] = useState(false);

  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  const isLocalSrc = src_image?.startsWith("blob:");
  const isVisible = visible || isLocalSrc;
  const isLoading = isVisible && !loaded && !error;

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    loadIdRef.current++;
    //eslint-disable-next-line
    setLoaded(false);
    setError(false);
    setRatio(null);
    setHideLoader(false);
    setMediaType(null);
  }, [src_image]);

  useEffect(() => {
    if (!src_image) return;
    if (src_image.startsWith("data:video")) {
      //eslint-disable-next-line
      setMediaType("video");
      return;
    }

    const ext = src_image.split(".").pop()?.toLowerCase();

    if (["mp4", "webm", "mov"].includes(ext || "")) {
      setMediaType("video");
      return;
    }

    if (src_image.startsWith("blob:")) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = src_image;

      video.onloadedmetadata = () => setMediaType("video");
      video.onerror = () => setMediaType("image");

      return;
    }

    setMediaType("image");
  }, [src_image]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        const video = videoRef.current;
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, []);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const id = loadIdRef.current;
    const img = e.currentTarget;

    if (img.naturalWidth && img.naturalHeight) {
      setRatio(img.naturalWidth / img.naturalHeight);
    }

    if (id === loadIdRef.current) {
      setLoaded(true);
    }
  };

  const handleVideoMeta = () => {
    const id = loadIdRef.current;
    const video = videoRef.current;

    if (!video) return;

    if (video.videoWidth && video.videoHeight) {
      setRatio(video.videoWidth / video.videoHeight);
    }

    if (id === loadIdRef.current) {
      setLoaded(true);
    }
  };

  const handleError = () => {
    const id = loadIdRef.current;
    if (id === loadIdRef.current) {
      setError(true);
    }
  };

  const handlePreview = () => {
    if (preview && mediaType === "image") {
      setViewPreview(true);
    }
  };

  return (
    <>
      <div
        onClick={handlePreview}
        ref={containerRef}
        className={styles.divImg}
        style={{
          aspectRatio: ratio ? `${ratio}` : "1/1",
          cursor: preview && hideLoader && mediaType === "image" ? `var(--cursor-1), zoom-in` : "default",
        }}
      >
        {!isVisible && <div className={styles.placeholder} />}

        {mediaType === null && isVisible && <DefaultLoader elementIsReady={false} />}

        {!error && mediaType === "image" && (
          <img
            loading="lazy"
            src={src_image}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleError}
            className={`${styles.media} ${loaded ? styles.ready : ""}`}
            {...props}
          />
        )}

        {isVisible && !error && mediaType === "video" && (
          <video
            src={src_image}
            ref={videoRef}
            key={src_image}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            onLoadedMetadata={handleVideoMeta}
            onError={handleError}
            className={`${styles.media} ${loaded ? styles.ready : ""}`}
            {...props}
          />
        )}

        {!hideLoader && isVisible && mediaType !== null && (
          <DefaultLoader elementIsReady={!isLoading} callBackEndAnimation={() => setHideLoader(true)} />
        )}

        {error && <div className={styles.error} />}
      </div>
      {viewPreview && (
        <PreviewerImg
          backClick={() => {
            setViewPreview(false);
            console.log("lol");
          }}
          src={src_image}
        />
      )}
    </>
  );
};
