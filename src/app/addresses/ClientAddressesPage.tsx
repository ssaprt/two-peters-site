"use client";
import { NotFound } from "@/components/emptyPlaceholders/NotFound/NotFound";
import { UnControlScrollSection } from "@/components/UnControlScrollSection/UnControlScrollSection";
import { AddressType } from "@/lib/api/Addresses";
import { layoutStore } from "@/stores/LayoutStore";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Addresses } from "./Addresses/Addresses";

type Props = {
    initialAddresses: AddressType[] | null;
};

export const ClientAdderessesPage = ({ initialAddresses }: Props) => {
    const { setNeedFillHeaderWithFixed, setFixedHeader, isMobile } =
        useAppContext();
    useEffect(() => {
        setFixedHeader(true);
        setNeedFillHeaderWithFixed(true);
        layoutStore.addLoadElement("addr");
        let timeOut = setTimeout(
            () => layoutStore.setLoadElement("addr"),
            1000,
        );
        return () => clearTimeout(timeOut);
    }, []);

    return (
        <UnControlScrollSection
            style={{
                paddingTop: "0px",
            }}
            id="block-1"
        >
            {initialAddresses !== null ? (
                <Addresses addresses={initialAddresses} />
            ) : (
                <NotFound title="Адреса не доступны" />
            )}
        </UnControlScrollSection>
    );
};
