import { getTourImageSrc, TourDTO as T } from "@/lib/api/Tours";

import TwoTicket from "@/assets/icons/common/two_tickets.svg";
import clsx from "clsx";
import { ButtonWithSvg } from "../button/buttonWithSvg/buttonWithSvg";
import EmblaCarousel from "../image/Carousel/Carousel";
import { TourSet } from "../TourSet/TourSet";
import styles from "./Tour.module.css";

export const Tour = ({ tour }: { tour: T }) => {
    console.log(tour);
    return (
        <div className={styles.tour}>
            <div className={styles.content}>
                <div className={styles.section}>
                    <div
                        className={clsx(
                            styles.lineTop,
                            "tag-font text-[10px] md:text-[12px] lg:text-[13px]",
                        )}
                    >
                        Название тура
                    </div>
                    <h3 className="text-[14px] md:text-[16px] lg:text-[18px] link-font">
                        {tour.title}
                    </h3>
                </div>
                <EmblaCarousel
                    data-lenis-prevent
                    slides={tour.images.map((img) =>
                        getTourImageSrc(img, tour.id),
                    )}
                    options={{ loop: true }}
                />

                <div className={styles.section}>
                    <div
                        className={clsx(
                            styles.lineTop,
                            "tag-font text-[10px] md:text-[12px] lg:text-[13px]",
                        )}
                    >
                        Место проведения
                    </div>
                    <h3 className="text-[14px] md:text-[16px] lg:text-[18px] link-font">
                        {tour.address}
                    </h3>
                </div>

                <br />

                <div className={styles.section}>
                    <div
                        className={clsx(
                            styles.lineTop,
                            "tag-font text-[10px] md:text-[12px] lg:text-[13px]",
                        )}
                    >
                        Сэты
                    </div>
                </div>

                {tour.blocks
                    .filter((block) => block.type === "tour")
                    .map((block) => (
                        <TourSet key={block.id} set={block} />
                    ))}

                <br />

                <div className={styles.section}>
                    <div
                        className={clsx(
                            styles.lineTop,
                            "tag-font text-[10px] md:text-[12px] lg:text-[13px]",
                        )}
                    >
                        Дополнительная информация
                    </div>
                    <h3 className="text-[14px] md:text-[16px] lg:text-[18px] link-font">
                        {
                            tour.blocks.filter(
                                (block) => block.type === "additional",
                            )[0].data.title
                        }
                    </h3>
                </div>

                {tour.blocks
                    .filter((block) => block.type === "additional")
                    .map((block) => (
                        <TourSet key={block.id} set={block} />
                    ))}
            </div>

            <ButtonWithSvg
                icon={<TwoTicket />}
                title={`Забронировать ${tour.blocks.filter((block) => block.type === "booking")[0].data.phone}`}
                href={`tel:${tour.blocks.filter((block) => block.type === "booking")[0].data.phone}`}
                subtitle="Нажмите для вызова"
            />
        </div>
    );
};
