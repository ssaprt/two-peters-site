"use client";
import AddressIcon from "@/assets/icons/common/addresses.svg";
import { AddressComponent } from "@/components/AddressComponent/AddressComponent";
import { ButtonWithSvg } from "@/components/button/buttonWithSvg/buttonWithSvg";
import { Contacts } from "@/components/Contacts/Contacts";
import { TitleSection } from "@/components/titles/TitleWithLogo/TitleSection";
import { UnControlScrollSection } from "@/components/UnControlScrollSection/UnControlScrollSection";
import { AddressType } from "@/lib/api/Addresses";
import { layoutStore } from "@/stores/LayoutStore";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export const ClientContactsPage = ({
    initialAddress,
}: {
    initialAddress: AddressType;
}) => {
    const { setNeedFillHeaderWithFixed, setFixedHeader } = useAppContext();
    useEffect(() => {
        setFixedHeader(true);
        setNeedFillHeaderWithFixed(true);
        layoutStore.addLoadElement("contacts");
        let timeOut = setTimeout(
            () => layoutStore.setLoadElement("contacts"),
            1000,
        );
        return () => clearTimeout(timeOut);
    }, []);

    return (
        <UnControlScrollSection id="block-1" style={{ marginBottom: "80px" }}>
            <TitleSection title="Контакты" />
            <Contacts />
            <TitleSection title="Наша винодельня" />
            <AddressComponent address={initialAddress} />
            <div className="flex justify-center lg:justify-start">
                <ButtonWithSvg
                    icon={<AddressIcon />}
                    title="Посмотреть все адреса"
                    href="/addresses"
                    subtitle="перейти к списку адресов"
                />
            </div>
        </UnControlScrollSection>
    );
};
