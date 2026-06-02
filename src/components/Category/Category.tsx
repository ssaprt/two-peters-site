import { useAppContext } from "@/app/context/AppContext";
import IconSort from "@/assets/icons/sort/sort-wine.svg";
import { useMounted } from "@/hooks/Utils/useMounted";
import { CategoryInterface, getCover } from "@/lib/api/Collection";
import clsx from "clsx";
import { ButtonWithSvg } from "../button/buttonWithSvg/buttonWithSvg";
import { DefaultObserveImage } from "../image/DefaultObserveImage/DefaultObserveImage";
import styles from "./Category.module.css";

export const Category = ({ category }: { category: CategoryInterface }) => {
    const { isMobile } = useAppContext();
    const mounted = useMounted();

    if (!mounted) return null;
    return (
        <div className={styles.category}>
            <div
                className={clsx(
                    styles.cover,
                    `w-[100%] md:w-[280px] lg:w-[380px]
                    h-auto
                    md:max-h-[280px]
                    lg:max-h-[380px]
                    `,
                )}
            >
                <DefaultObserveImage
                    fixedHeight={
                        isMobile
                            ? document.documentElement.clientWidth - 40
                            : undefined
                    }
                    image={{
                        preview: false,
                        contain: false,
                    }}
                    src_image={getCover(category)}
                    alt={`${category.name} - коллекция вин, созданных из винограда в лучшей винодельне восточного Крыма`}
                />
            </div>

            <div className={styles.overlayContent}>
                <h3 className={clsx(styles.title, "title-section-font")}>
                    {category.name}
                </h3>

                <ButtonWithSvg
                    href={`/collection/${category.id}`}
                    title="Ознакомиться"
                    subtitle="Перейти в коллекцию"
                    icon={<IconSort />}
                />
            </div>
        </div>
    );
};
