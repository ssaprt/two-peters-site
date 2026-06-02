import { useAppContext } from "@/app/context/AppContext";
import AddressIcon from "@/assets/icons/common/addresses.svg";
import { AddressComponent } from "@/components/AddressComponent/AddressComponent";
import { ButtonWithSvg } from "@/components/button/buttonWithSvg/buttonWithSvg";
import { NotFound } from "@/components/emptyPlaceholders/NotFound/NotFound";
import { TitleSection } from "@/components/titles/TitleWithLogo/TitleSection";
import { AddressType } from "@/lib/api/Addresses";
import styles from "./GeneralAddress.module.css";

export const GeneralAddress = ({
    address,
}: {
    address: AddressType | null;
}) => {
    const { isMobile } = useAppContext();
    return (
        <>
            <div className={styles.address}>
                <TitleSection
                    title={"Винодельня" + (isMobile ? "" : " two-peters")}
                />
                {address ? (
                    <AddressComponent general={true} address={address} />
                ) : (
                    <NotFound title="Адрес не доступен" />
                )}
            </div>

            <div className={styles.button}>
                <ButtonWithSvg
                    icon={<AddressIcon />}
                    title="Посмотреть все адреса"
                    href="/addresses"
                    subtitle="перейти к списку адресов"
                />
            </div>
        </>
    );
};
