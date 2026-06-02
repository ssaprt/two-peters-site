import { getCollection } from "@/lib/api/Collection";

import { ClientColelctionPage } from "./ClientColelctionPage";

import { redirect } from "next/navigation";
import { metadata as baseMetaData } from "./SEO/meta";
import { schema, schemaBreadCrumbs } from "./SEO/schema";

export const metadata = baseMetaData;

export default async function Collection() {
    const categories = await getCollection();
    if (categories!.length === 1) {
        redirect(`/collection/${categories![0].id}`);
    }

    return (
        <>
            <ClientColelctionPage categories={categories!} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schema(categories!)),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaBreadCrumbs()),
                }}
            />
        </>
    );
}
