import { getFairsRange } from "@/lib/api/Fairs";
import { getVideoPage } from "@/lib/api/VideoPage";
import { Metadata } from "next";
import { schemaBreadCrumbs } from "../addresses/SEO/schema";
import { ClientFairsPage } from "./ClientFairsPage";
import { generatePageMetadata } from "./SEO/meta";
import { schemaFairs } from "./SEO/schema";

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata();
}

export default async function Fairs() {
    const page = await getVideoPage(1);
    const firstPartFairs = await getFairsRange(0);
    const allFairs = await getFairsRange(0, 9999);

    return (
        <>
            <ClientFairsPage page={page} initialFairs={firstPartFairs!} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaBreadCrumbs),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaFairs(allFairs?.fairs!)),
                }}
            />
        </>
    );
}
