import Call from "@/assets/icons/fairs/call.svg";
import Globe from "@/assets/icons/fairs/globe.svg";
import { EachTag } from "@/types/Fair.interface";
import clsx from "clsx";
import React from "react";

export const createTagElement = (
    tag: EachTag,
    styles: Record<string, string>,
) => {
    const svgSize = `w-[16px] h-[16px] md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px]`;

    const sizeMap: Record<string, string> = {
        h1: "text-[20px] md:text-[22px] lg:text-[24px]  text-[var(--global-neutral-color)] opacity-100",
        h2: "text-[18px] md:text-[20px] lg:text-[22px]  text-[var(--global-neutral-color)] opacity-100",
        h3: "text-[16px] md:text-[18px] lg:text-[20px]  text-[var(--global-neutral-color)] opacity-100",

        p: "text-[12px] md:text-[14px] lg:text-[16px] my-6  text-[var(--global-neutral-color)] opacity-80",
        span: "text-[12px] md:text-[14px] lg:text-[16px]  text-[var(--global-neutral-color)] opacity-80",
        b: "text-[12px] md:text-[14px] lg:text-[16px] font-bold  text-[var(--global-neutral-color)] opacity-80",
        i: "text-[12px] md:text-[14px] lg:text-[16px] italic  text-[var(--global-neutral-color)] opacity-80",

        a: "text-[10px] md:text-[12px] lg:text-[12px]",
        tel: "text-[10px] md:text-[12px] lg:text-[12px]",

        space: "",
    };

    const commonProps = {
        className: clsx(styles.tag, sizeMap[tag.tag] || "text-base"),
        key: tag.id + "-" + tag.position,
        children: tag.text,
    };

    switch (true) {
        case ["h1", "h2", "h3", "p", "span", "b", "i"].includes(tag.tag):
            return React.createElement(tag.tag, commonProps);

        case ["a", "tel"].includes(tag.tag):
            return (
                <a
                    data-tooltip={tag.href}
                    key={tag.id + "-" + tag.position}
                    href={tag.tag === "tel" ? "tel:" : "" + tag.href}
                    className={`${styles.tag} ${styles.tagA} ${sizeMap[tag.tag]}`}
                >
                    {tag.tag === "tel" ? (
                        <Call className={svgSize} />
                    ) : (
                        <Globe className={svgSize} />
                    )}
                    <span>{tag.text}</span>
                </a>
            );

        case tag.tag === "space":
            return (
                <div
                    key={tag.id + "-" + tag.position}
                    className={`${styles.tag} ${styles.space}`}
                ></div>
            );

        default:
            return React.createElement("div", commonProps);
    }
};
