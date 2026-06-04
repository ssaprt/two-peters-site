import { useAppContext } from "@/app/context/AppContext";
import Pallet from "@/assets/icons/pages/home/back-plate.svg";
import clsx from "clsx";
import Link from "next/link";
import styles from "./TwoBlock.module.css";
export const TwoBlock = () => {
    const { collection } = useAppContext();

    return (
        <div className={styles.content}>
            <h4
                className="
                    text-5xl
                    md:text-5xl
                    lg:text-6xl

                    tracking-[2px]
                    md:tracking-[4px]
                    lg:tracking-[6px]

                    user-select-none

                    font-['Courier_New',monospace] 
                    [word-spacing:9999999px] 
                    text-center
                    uppercase
                     
                    font-bold 
                    text-white/80"
            >
                Винная коллекция
            </h4>
            <Link
                href={
                    "/collection" + (collection === 1 ? `/${collection}` : "")
                }
                className={clsx(
                    styles.link,
                    `
                w-[280px]
                md:w-[360px]
                lg:w-[400px]`,
                )}
            >
                <h3
                    className="
                      text-2xl
                      md:text-2xl
                      lg:text-3xl

                      tracking-[2px]
                      tracking-[4px]
                      tracking-[6px]

                      font-['Courier_New',monospace] 
                      [word-spacing:9999999px] 
                      text-center
                      uppercase 
                      text-white/80"
                >
                    исследовать
                </h3>
                <Pallet className={styles.pallet} />
            </Link>
        </div>
    );
};
