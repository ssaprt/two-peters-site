"use client";

import { HrBlocks } from "@/components/hr/HrBlocks/HrBlocks";
import { LinkBack } from "@/components/linkBack/LinkBack";
import { TitleSection } from "@/components/titles/TitleWithLogo/TitleSection";
import { UnControlScrollSection } from "@/components/UnControlScrollSection/UnControlScrollSection";
import { CategoryInterface } from "@/lib/api/Collection";
import { layoutStore } from "@/stores/LayoutStore";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Categories } from "./Categories/Categories";

export const ClientColelctionPage = ({
    categories,
}: {
    categories: CategoryInterface[];
}) => {
    const { setNeedFillHeaderWithFixed, setFixedHeader } = useAppContext();
    useEffect(() => {
        setFixedHeader(true);
        setNeedFillHeaderWithFixed(true);
        layoutStore.addLoadElement("collection");
        let timeOut = setTimeout(
            () => layoutStore.setLoadElement("collection"),
            1000,
        );
        return () => clearTimeout(timeOut);
    }, []);

    return (
        <UnControlScrollSection id="block-1" style={{ minHeight: "100dvh" }}>
            <LinkBack title="Назад" />
            <TitleSection
                title="Винная коллекция"
                style={{
                    textAlign: "center",
                    marginBottom: "40px",
                    marginTop: "40px",
                }}
            />
            <HrBlocks />
            <Categories categories={categories} />
        </UnControlScrollSection>
    );
};
