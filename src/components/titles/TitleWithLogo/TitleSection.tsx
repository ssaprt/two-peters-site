import clsx from "clsx";
import { CSSProperties } from "react";
import styles from "./TitleSection.module.css";
export const TitleSection = ({
    title,
    style,
}: {
    title: string;
    style?: CSSProperties;
}) => {
    return (
        <h3
            className={clsx(
                styles.title,
                ` text-2xl
                  md:text-3xl
                  lg:text-4xl

                  text-center
                  md:text-left
                  lg:text-left

                  title-section-font`,
            )}
            style={{ ...style }}
        >
            {title}
        </h3>
    );
};
