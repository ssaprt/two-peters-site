import { Status } from "@/components/Fair/Status/Status";
import { Title } from "@/components/Fair/Title/Title";
import { DefaultObserveImage } from "@/components/image/DefaultObserveImage/DefaultObserveImage";
import { DEFAULT_EXAMPLE, FairInterface, getFairImage } from "@/lib/api/Fairs";
import clsx from "clsx";
import { ContentFair } from "./ContentFair/ContentFair";
import styles from "./FairContainer.module.css";

export const FairContainer = ({ fair }: { fair: FairInterface }) => {
    return (
        <div
            className={clsx(
                styles.fair,
                `
           w-[100%]`,
            )}
        >
            <Title>{fair.title_article}</Title>
            <Status dateStart={fair.date_start} dateEnd={fair.date_end} />
            <div
                className={clsx(
                    styles.imgBox,
                    `
        w-[100%]
        md:w-[500px]
        lg:w-[600px]
        self-center
        md:self-start`,
                )}
            >
                <DefaultObserveImage
                    video={{
                        muted: true,
                        controls: true,
                    }}
                    image={{
                        preview: true,
                    }}
                    src_image={getFairImage(fair.id, fair.img_article)}
                    fallbackSrc={DEFAULT_EXAMPLE}
                    alt={fair.title_article}
                />
            </div>
            <ContentFair content={fair.content} />
        </div>
    );
};
