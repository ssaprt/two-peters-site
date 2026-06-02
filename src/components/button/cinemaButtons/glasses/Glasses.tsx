import Glass from "@/assets/icons/pages/home/glass.svg";
import styles from "./Glasses.module.css";

export const Glasses = ({ style = {} }: { style?: React.CSSProperties }) => {
    return (
        <div className={styles.container} style={{ ...style }}>
            <Glass className={styles.glass} />
            <div className={styles.animationLayer}>
                <div className={styles.glassAlternative}>
                    <div className={styles.liquidContainer}>
                        <div className={styles.liquid}></div>
                        <div className={styles.liquidSurface}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
