import Current from "@/assets/icons/fairs/current.svg";
import BeforeAfter from "@/assets/icons/fairs/end.svg";
import { normalizeRangeDate } from "@/utils/normalizeRangeDate";
import clsx from "clsx";
import styles from "./Status.module.css";

type Props = {
    dateStart: string;
    dateEnd: string;
};

export const Status = ({ dateStart, dateEnd }: Props) => {
    let clName: string;
    let text: string;
    let icon: React.ReactNode;
    let bgColor: string;

    const iconStyle = `
        w-[16px]
        h-[16px]
        md:w-[20px]
        md:h-[20px]
        lg:w-[24px]
        lg:h-[24px]`;

    switch (normalizeRangeDate(dateStart, dateEnd).status) {
        case "end":
            clName = styles.end;
            text = "завершено";
            icon = <BeforeAfter className={iconStyle} />;
            bgColor = "#b4b4b4";
            break;
        case "current":
            clName = styles.current;
            text = "в разгаре";
            icon = <Current className={iconStyle} />;
            bgColor = "var(--success-color)";
            break;
        case "new":
            clName = styles.new;
            text = "еще не началось";
            icon = <BeforeAfter className={iconStyle} />;
            bgColor = "var(--global-color-link)";
            break;
    }

    return (
        <div className={clsx(styles.status, clName)}>
            <span
                className={clsx(
                    styles.date,
                    `
                        text-[10px]
                        md:text-[10px]
                        lg:text-[12px]
                `,
                )}
            ></span>
            {icon}
            <span
                data-tooltip={text}
                data-bgcolor={bgColor}
                data-background="black"
                className={clsx(
                    styles.textStatus,
                    `
                        text-[10px]
                        md:text-[10px]
                        lg:text-[12px]
                    `,
                )}
            >
                {normalizeRangeDate(dateStart, dateEnd).dateStart} -{" "}
                {normalizeRangeDate(dateStart, dateEnd).dateEnd}
            </span>
        </div>
    );
};
