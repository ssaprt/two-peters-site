import { getFairsRange } from "@/lib/api/Fairs";
import { atEnd } from "@/utils/Fairs/atEnd";
import { Metadata } from "next";

export async function generatePageMetadata(): Promise<Metadata> {
    const fairsResponce = await getFairsRange(0, 9999);
    const count = fairsResponce?.total;

    return {
        title: `${count || 100} ${atEnd(count || 100)} по всей территории России`,
        description: `Проведение более чем ${count || 100} с участием создателей винодельни «Два Петра»`,

        alternates: {
            canonical: `https://two-peters.ru/fairs`,
        },

        openGraph: {
            title: `${count || 100} ${atEnd(count || 100)} по всей территории России`,
            description: `Проведение более чем ${count || 100} с участием создателей винодельни «Два Петра»`,
            url: `https://two-peters.ru/fairs`,
            images: [
                {
                    url: `https://two-peters.ru/uploads/fairs/default/default.png`,
                    width: 1200,
                    height: 630,
                    alt: `Проведение более чем ${count || 100} с участием создателей винодельни «Два Петра»`,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: `${count || 100} ${atEnd(count || 100)} реализации вина`,
            description: `Проведение более чем ${count || 100} с участием создателей винодельни «Два Петра»`,
            images: [`https://two-peters.ru/uploads/fairs/default/default.png`],
        },
    };
}
