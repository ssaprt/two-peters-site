import HR from "@/assets/icons/pages/hr-windows.svg";
import clsx from "clsx";
import styles from "./HrBlocks.module.css";
export const HrBlocks = () => {
    return (
        <HR
            className={clsx(
                styles.hr,
                `
            w-[50%] 
            md:w-[300px] 
            lg:w-[300px]
            min-w-[200px]
            `,
            )}
        />
    );
};
