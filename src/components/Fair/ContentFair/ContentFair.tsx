import { EachTag } from "@/types/Fair.interface";
import clsx from "clsx";
import styles from "./ContentFair.module.css";
import { createTagElement } from "./createTag";

type Props = {
    content: EachTag[];
};

export const ContentFair = ({ content }: Props) => {
    const styleTailwind = `
    w-[100%]
    md:w-[800px]
    lg:w-[900px]
    font["Open Sans", sans-serif]
    flex flex-wrap items-start`;

    return (
        <div className={clsx(styles.content, styleTailwind, "tag-font")}>
            {content.map((item) => {
                return createTagElement(item, styles);
            })}
        </div>
    );
};
