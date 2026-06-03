import { useAppContext } from "@/app/context/AppContext";
import TwoTickets from "@/assets/icons/common/two_tickets.svg";
import { ButtonWithSvg } from "@/components/button/buttonWithSvg/buttonWithSvg";
import { NotFound } from "@/components/emptyPlaceholders/NotFound/NotFound";
import { DefaultObserveImage } from "@/components/image/DefaultObserveImage/DefaultObserveImage";
import { TitleSection } from "@/components/titles/TitleWithLogo/TitleSection";
import { useMounted } from "@/hooks/Utils/useMounted";
import { ContentBlock, getImageGeneralTour } from "@/lib/api/GeneralTour";
import clsx from "clsx";
import styles from "./GeneralTour.module.css";

export const GeneralTour = ({
    generalTour,
}: {
    generalTour: ContentBlock | null;
}) => {
    const { isMobile } = useAppContext();
    const mounted = useMounted();

    if (!mounted) return null;
    if (!generalTour) return <NotFound title="Тур не найден" />;
    return (
        <>
            <TitleSection title="винный туризм" />
            <div className={styles.overlay}>
                <div className={styles.center}>
                    <div className={styles.section}>
                        <h4
                            className={clsx(
                                styles.subtitle,
                                `text-[12px] md:text-[12px] lg:text-[14px] link-font`,
                            )}
                        >
                            {generalTour.textTop}
                        </h4>
                        <div className={styles.imgs}>
                            <div className={styles.img}>
                                <DefaultObserveImage
                                    alt="Два Петра - лучшая винодельня Крыма в 2024 году."
                                    fixedHeight={!isMobile ? 180 : undefined}
                                    src_image={getImageGeneralTour(
                                        generalTour,
                                        "firstPair",
                                        1,
                                        0,
                                    )}
                                    image={{
                                        preview: isMobile ? false : true,
                                    }}
                                />
                                <span className={styles.caption}>
                                    {generalTour.firstPair[0].caption}
                                </span>
                            </div>
                            <div className={styles.img}>
                                <DefaultObserveImage
                                    alt="Дегустационный винный зал two-peters расположен в самом сердце восточного Крыма"
                                    fixedHeight={!isMobile ? 180 : undefined}
                                    src_image={getImageGeneralTour(
                                        generalTour,
                                        "firstPair",
                                        2,
                                        1,
                                    )}
                                    image={{
                                        preview: isMobile ? false : true,
                                    }}
                                />
                                <span className={styles.caption}>
                                    {generalTour.firstPair[1].caption}
                                </span>
                            </div>
                            <div className={styles.img}>
                                <DefaultObserveImage
                                    alt="Two-peters - ярмарки и события каждую неделю по всей территории России"
                                    fixedHeight={!isMobile ? 180 : undefined}
                                    src_image={getImageGeneralTour(
                                        generalTour,
                                        "secondPair",
                                        4,
                                        1,
                                    )}
                                    image={{
                                        preview: isMobile ? false : true,
                                    }}
                                />
                                <span className={styles.caption}>
                                    {generalTour.secondPair[1].caption}
                                </span>
                            </div>
                            <div className={styles.img}>
                                <DefaultObserveImage
                                    alt="Два Петра - производство вина в Крыму на современном оборудование, в лучших традициях виноделия"
                                    fixedHeight={!isMobile ? 180 : undefined}
                                    src_image={getImageGeneralTour(
                                        generalTour,
                                        "secondPair",
                                        3,
                                        0,
                                    )}
                                    image={{
                                        preview: isMobile ? false : true,
                                    }}
                                />
                                <span className={styles.caption}>
                                    {generalTour.secondPair[0].caption}
                                </span>
                            </div>
                        </div>
                        <h4
                            className={clsx(
                                styles.subtitle,
                                `text-[12px] md:text-[12px] lg:text-[14px] link-font`,
                            )}
                        >
                            {generalTour.textMiddle}
                        </h4>
                    </div>
                </div>
                <div className={clsx(styles.section, styles.lastSection)}>
                    <div className={styles.imgs}>
                        <div className={styles.img}>
                            <DefaultObserveImage
                                alt="Два Петра - проведение туров по собственнйо винодельне, уникальный дегустационный опыт и посещение локаций в Крыму"
                                src_image={getImageGeneralTour(
                                    generalTour,
                                    "finalImage",
                                    5,
                                    0,
                                )}
                                image={{
                                    preview: isMobile ? false : true,
                                }}
                            />
                        </div>
                    </div>
                    <h4
                        className={clsx(
                            styles.subtitle,
                            `text-[12px] md:text-[12px] lg:text-[14px] link-font`,
                        )}
                    >
                        {generalTour.textBottom}
                    </h4>
                </div>
                <div className={styles.bottom}>
                    <ButtonWithSvg
                        href="/tours"
                        icon={
                            <TwoTickets
                                style={{
                                    transform: "rotate(45deg)",
                                    transformOrigin: "center",
                                }}
                            />
                        }
                        title="Изучить винный туризм"
                        subtitle="Перейти к турам"
                    />
                </div>
            </div>
        </>
    );
};
