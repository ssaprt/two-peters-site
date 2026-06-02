import { useMounted } from "@/hooks/Utils/useMounted";
import clsx from "clsx";
import { createPortal } from "react-dom";
import styles from "./ProductTop.module.css";

export const DescriptionProduct = ({
    description,
    to,
}: {
    description: string;
    to: HTMLElement;
}) => {
    const mounted = useMounted();

    if (!mounted || !to) return null;
    return createPortal(
        <span
            className={clsx(
                styles.description,
                `link-font text-[14px] md:text-[16px] lg:text-[20px]`,
            )}
        >
            {description}
        </span>,
        to,
    );
};
