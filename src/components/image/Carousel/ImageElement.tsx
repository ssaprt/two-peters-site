import { DefaultLoader } from "@/components/loaders/DefaultLoader/DefaultLoader";
import Image from "next/image";
import { useState } from "react";
import styles from "./Carousel.module.css";

export const ImageElement = ({ img }: { img: string }) => {
    const [readyLoad, setReadyLoad] = useState(false);
    const [readyUnmount, setReadyUnmount] = useState(false);

    return (
        <div className={styles.embla__slide__img}>
            <Image
                src={img}
                alt=""
                width={1920}
                height={1080}
                className={styles.img}
                onLoad={() => setReadyLoad(true)}
            />
            {!readyUnmount && (
                <DefaultLoader
                    elementIsReady={readyLoad}
                    callBackEndAnimation={() => setReadyUnmount(true)}
                />
            )}
        </div>
    );
};
