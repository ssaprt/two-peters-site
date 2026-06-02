import Feather from "@/assets/icons/common/feather.svg";
import styles from "./Title.module.css";

export const Title = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.title}>
            <Feather
                className="
                    w-[20px]
                    h-[20px]
                    md:w-[24px]
                    md:h-[24px]
                    lg:w-[30px]
                    lg:h-[30px]"
            />
            <h1
                className="
                  text-[16px]
                  md:text-[18px]
                  lg:text-[22px]"
            >
                {children}
            </h1>
        </div>
    );
};
