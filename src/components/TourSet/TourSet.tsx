import PointIcon from "@/assets/icons/tours/point.svg";
import PriceIcon from "@/assets/icons/tours/price.svg";
import TourNameIcon from "@/assets/icons/tours/tourNameIcon.svg";
import { AdditionalBlock, TourBlock } from "@/lib/api/Tours";
import clsx from "clsx";
import styles from "./TourSet.module.css";

export const TourSet = ({ set }: { set: TourBlock | AdditionalBlock }) => {
    return set.type === "tour" ? (
        <div className={styles.set} data-type="СЭТ">
            <div className={styles.section}>
                <TourNameIcon />
                <h3
                    className={clsx(
                        "text-[12px] md:text-[14px] lg:text-[16px] link-font",
                        styles.title,
                    )}
                >
                    {set.data.title}
                </h3>
            </div>
            <div className={styles.features}>
                {set.data.features.map((feature, i) => (
                    <div key={feature.id + i} className={styles.feature}>
                        <div className={styles.icon}>
                            <PointIcon />
                        </div>
                        <p className="text-[14px] md:text-[14px] lg:text-[16px] link-font">
                            {feature.text}
                        </p>
                    </div>
                ))}
                <div className={styles.feature}>
                    <div className={styles.icon}>
                        <PriceIcon style={{ marginTop: "4px" }} />
                    </div>
                    <p className="text-[14px] md:text-[14px] lg:text-[16px] link-font">
                        {set.data.price}
                    </p>
                </div>
            </div>
        </div>
    ) : (
        <>
            {set.data.items.map((item, i) => {
                return (
                    <div
                        className={styles.set}
                        data-type="ДОП"
                        key={`${item.id + i}-additional`}
                    >
                        <div className={styles.features}>
                            <div
                                className={clsx(
                                    styles.feature,
                                    styles.additional,
                                )}
                            >
                                <div className={styles.icon}>
                                    <PointIcon />
                                </div>
                                <p className="text-[14px] md:text-[14px] lg:text-[16px] link-font">
                                    {item.text}
                                </p>
                            </div>
                            <div className={styles.feature}>
                                <div className={styles.icon}>
                                    <PriceIcon style={{ marginTop: "4px" }} />
                                </div>
                                <p className="text-[14px] md:text-[14px] lg:text-[16px] link-font">
                                    {item.price}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
