import { getGeneralAddress } from "@/lib/api/Addresses";
import { getGeneralFair } from "@/lib/api/Fairs";
import { getGeneralTour } from "@/lib/api/GeneralTour";
import { getVideoPage } from "@/lib/api/VideoPage";
import { ClientHomePage } from "./ClientHomePage";
import { schemaHome } from "./SEO/schema";

export default async function Home() {
    const page = await getVideoPage(0);
    const generalFair = await getGeneralFair();
    const firstPartAddress = await getGeneralAddress();
    const generalTour = await getGeneralTour();
    console.log(generalTour);

    return (
        <>
            <ClientHomePage
                page={page}
                fair={generalFair!}
                address={firstPartAddress!}
                generalTour={generalTour!}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        schemaHome({
                            fair: generalFair,
                            address: firstPartAddress!,
                            tourism: generalTour!,
                        }),
                    ),
                }}
            />
        </>
    );
}
