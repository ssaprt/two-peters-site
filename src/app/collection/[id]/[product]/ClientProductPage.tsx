"use client";

import { useAppContext } from "@/app/context/AppContext";
import ControlScrollSection from "@/components/ControlScrollSection/ControlScrollSection";
import { UnControlScrollSection } from "@/components/UnControlScrollSection/UnControlScrollSection";
import { NotFound } from "@/components/emptyPlaceholders/NotFound/NotFound";
import { LinkBack } from "@/components/linkBack/LinkBack";
import { ProductInterface } from "@/lib/api/Products";
import { useEffect } from "react";
import { ProductMobileContent } from "./Product/ProductMobileContent";
import { ProductTop } from "./Product/ProductTop";

export const ClientProductPage = ({
    product,
}: {
    product: ProductInterface | null;
}) => {
    const { setNeedFillHeaderWithFixed, setFixedHeader, isMobile } =
        useAppContext();
    useEffect(() => {
        setFixedHeader(true);
        setNeedFillHeaderWithFixed(!false);
    }, []);

    return product !== null ? (
        <>
            <LinkBack title="Назад к винам" />
            <ControlScrollSection id="block-1" fillBg={true}>
                <ProductTop product={product} />
            </ControlScrollSection>

            <UnControlScrollSection
                style={{
                    padding: "0px",
                    paddingTop: "0px",
                    display: !isMobile ? "none" : "block",
                }}
                id="block-2"
            >
                <ProductMobileContent product={product} />
            </UnControlScrollSection>
        </>
    ) : (
        <UnControlScrollSection id="block-1" style={{ minHeight: "100dvh" }}>
            <NotFound />
        </UnControlScrollSection>
    );
};
