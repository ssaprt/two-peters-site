import { getCategoryFromId, getCollection } from "@/lib/api/Collection";
import { getProductsFromIdCategory } from "@/lib/api/Products";
import { ClientProductsPage } from "./ClientProductsPage";

import { Metadata } from "next";
import { generatePageMetadata } from "./SEO/meta";
import { schema, schemaBreadCrumbs } from "./SEO/schema";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    return generatePageMetadata(id);
}

export default async function Products({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const categories = await getCollection();
    const category = getCategoryFromId(Number(id), categories!);
    const products = await getProductsFromIdCategory(Number(id));

    return (
        <>
            <ClientProductsPage category={category!} products={products!} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        schema(Number(id), category!, products!),
                    ),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        schemaBreadCrumbs(
                            Number(id) || 1,
                            category?.name || "Авторские вина",
                        ),
                    ),
                }}
            />
        </>
    );
}
