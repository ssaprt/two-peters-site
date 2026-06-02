import { useMounted } from "@/hooks/Utils/useMounted";
import clsx from "clsx";
import { createPortal } from "react-dom";
import styles from "./ProductTop.module.css";

export const NameProduct = ({
    title,
    to,
}: {
    title: string;
    to: HTMLElement;
}) => {
    const mounted = useMounted();

    if (!mounted || !to) return null;
    return createPortal(
        <h3
            className={clsx(
                styles.title,
                `title-section-font text-[28px] md:text-[30px] lg:text-[40px]`,
            )}
        >
            {title}
        </h3>,
        to,
    );
};
