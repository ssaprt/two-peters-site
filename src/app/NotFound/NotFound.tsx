import { ButtonWithSvg } from "@/components/button/buttonWithSvg/buttonWithSvg";
import { TitleSection } from "@/components/titles/TitleWithLogo/TitleSection";
import clsx from "clsx";
import styles from "./NotFound.module.css";

export const NotFound = () => {
    return (
        <div className={styles.overlayNotFound}>
            <TitleSection
                title="Ничего не нашлось"
                style={{ textAlign: "center" }}
            />
            <h3
                className={clsx(
                    "text-[16px] md:text-[20px] lg:text-[24px] link-font",
                    styles.text,
                )}
            >
                Вино.... вино... я ищу вино....
            </h3>
            <div className={styles.dialog}>
                <div className={styles.block}>
                    <span
                        className={clsx("text-[12px] link-font", styles.text)}
                    >
                        Извините, здесь кто-нибудь есть?
                    </span>
                    <span
                        className={clsx(
                            "text-[12px] link-font",
                            styles.text,
                            styles.answer,
                        )}
                    >
                        - Кто здесь?
                    </span>
                </div>
                <div className={styles.block}>
                    <span
                        className={clsx("text-[12px] link-font", styles.text)}
                    >
                        Простите! Меня зовут...
                    </span>
                    <span
                        className={clsx(
                            "text-[12px] link-font",
                            styles.text,
                            styles.answer,
                        )}
                    >
                        - Можете не продолжать. Здесь вы ничего не найдете. Но я
                        знаю, где находится вино, о котором все говорят. И вам,
                        скажу я, очень повезло, вы совсем рядом!
                    </span>
                </div>
            </div>

            <ButtonWithSvg
                title="Винная коллекция"
                subtitle="Оценить разнообразие"
                href="/collection"
            />
        </div>
    );
};
