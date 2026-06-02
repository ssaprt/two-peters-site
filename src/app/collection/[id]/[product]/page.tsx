import { getProductByName } from "@/lib/api/Products";
import { ClientProductPage } from "./ClientProductPage";

import { getCategoryFromId, getCollection } from "@/lib/api/Collection";
import { Metadata } from "next";
import { schema, schemaBreadCrumbs } from "./SEO/schema";
import { generatePageMetadata } from "./meta";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ product: string }>;
}): Promise<Metadata> {
    const { product } = await params;

    return generatePageMetadata(product);
}

export default async function Product({
    params,
}: {
    params: Promise<{ product: string }>;
}) {
    const { product } = await params;
    const prod = await getProductByName(decodeURIComponent(product));
    const categories = await getCollection();
    const category = getCategoryFromId(
        Number(prod?.parent_category) || 1,
        categories!,
    );

    return (
        <>
            <ClientProductPage product={prod} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schema(prod!, category!)),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        schemaBreadCrumbs(
                            prod!,
                            category?.name || "Авторские вина",
                        ),
                    ),
                }}
            />
        </>
    );
}
