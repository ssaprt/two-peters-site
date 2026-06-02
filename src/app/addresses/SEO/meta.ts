import { getAllAddresses } from "@/lib/api/Addresses";
import { atEnd } from "@/utils/Addresses/atEnd";
import { Metadata } from "next";

export async function generatePageMetadata(): Promise<Metadata> {
    const addresses = await getAllAddresses();
    const count = addresses?.length;

    return {
        title: `${count || 100} ${atEnd(count || 100)} реализации вина`,
        description: `Мы продаем наше вино в более чем ${count || 100} магазинах, ресторанах, бакалеях и других местах реализации вина, производства винодельни «Два Петра»`,

        alternates: {
            canonical: `https://two-peters.ru/addresses`,
        },

        openGraph: {
            title: `${count || 100} ${atEnd(count || 100)} реализации вина`,
            description: `Мы продаем наше вино в более чем ${count || 100} магазинах, ресторанах, бакалеях и других местах реализации вина, производства винодельни «Два Петра»`,
            url: `https://two-peters.ru/addresses`,
            images: [
                {
                    url: `https://two-peters.ru/uploads/addresses/default/address.webp`,
                    width: 1200,
                    height: 630,
                    alt: `Мы продаем наше вино в более чем ${count || 100} магазинах, ресторанах, бакалеях и других местах реализации вина, производства винодельни «Два Петра»`,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: `${count || 100} ${atEnd(count || 100)} реализации вина`,
            description: `Мы продаем наше вино в более чем ${count || 100} магазинах, ресторанах, бакалеях и других местах реализации вина, производства винодельни «Два Петра»`,
            images: [
                `https://two-peters.ru/uploads/addresses/default/address.webp`,
            ],
        },
    };
}
