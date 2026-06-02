import { getTours } from "@/lib/api/Tours";
import { getVideoPage } from "@/lib/api/VideoPage";
import { Metadata } from "next";
import { ClientToursPage } from "./ClientToursPage";
import { generatePageMetadata } from "./SEO/meta";
import { schemaBreadCrumbs, schemaTours } from "./SEO/schema";

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata();
}

export default async function Tours() {
    const page = await getVideoPage(2);
    const tours = await getTours();
    return (
        <>
            <ClientToursPage video={page} tours={tours!} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaBreadCrumbs),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaTours(tours!)),
                }}
            />
        </>
    );
}
