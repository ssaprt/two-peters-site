import FairsIcon from "@/assets/icons/common/fairs.svg";
import { ButtonWithSvg } from "@/components/button/buttonWithSvg/buttonWithSvg";
import { NotFound } from "@/components/emptyPlaceholders/NotFound/NotFound";
import { FairContainer } from "@/components/Fair/FairContainer";
import { TitleSection } from "@/components/titles/TitleWithLogo/TitleSection";
import { FairInterface } from "@/lib/api/Fairs";
import clsx from "clsx";
import styles from "./GeneralFair.module.css";

export const GeneralFair = ({ fair }: { fair: FairInterface | null }) => {
    if (!fair)
        return <NotFound title="События не доступны" icon={<FairsIcon />} />;

    return (
        <div className={clsx(styles.container, "mt-[100px]")}>
            <TitleSection title="Актуальное событие" />
            <FairContainer fair={fair!} />
            <div className={styles.button}>
                <ButtonWithSvg
                    icon={<FairsIcon />}
                    title="Посмотреть все события"
                    href="/fairs"
                    subtitle="перейти к списку событий"
                />
            </div>
        </div>
    );
};
