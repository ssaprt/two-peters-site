"use client";

import { useAppContext } from "@/app/context/AppContext";
import { NotFound } from "@/components/emptyPlaceholders/NotFound/NotFound";
import { LinkBack } from "@/components/linkBack/LinkBack";
import { UnControlScrollSection } from "@/components/UnControlScrollSection/UnControlScrollSection";
import { CategoryInterface } from "@/lib/api/Collection";
import { ProductInterface } from "@/lib/api/Products";
import { layoutStore } from "@/stores/LayoutStore";
import { useEffect } from "react";
import { Products } from "./Products/Products";

type Props = {
    category: CategoryInterface;
    products: ProductInterface[];
};

export const ClientProductsPage = ({ category, products }: Props) => {
    const { setNeedFillHeaderWithFixed, setFixedHeader } = useAppContext();
    useEffect(() => {
        setFixedHeader(true);
        setNeedFillHeaderWithFixed(true);
        layoutStore.addLoadElement("products");
        let timeOut = setTimeout(
            () => layoutStore.setLoadElement("products"),
            1000,
        );
        return () => clearTimeout(timeOut);
    }, []);

    return (
        <UnControlScrollSection id="block-1" style={{ minHeight: "100dvh" }}>
            <LinkBack title="Назад" />
            {products.length > 0 ? (
                <Products category={category} products={products} />
            ) : (
                <NotFound />
            )}
        </UnControlScrollSection>
    );
};
