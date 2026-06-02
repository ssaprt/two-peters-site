import { getProductByName, getProductSrc } from "@/lib/api/Products";
import { Metadata } from "next";

export async function generatePageMetadata(product: string): Promise<Metadata> {
    const prod = await getProductByName(decodeURIComponent(product));

    return {
        title: `${prod?.name_wine} — ${prod?.type} вино из Крыма`,
        description: `${prod?.type} вино ${prod?.name_wine}  сорта винограда ${prod?.sort} производство ${prod?.origin} винодельни «Два Петра»`,
        alternates: {
            canonical: `https://two-peters.ru/collection/${prod?.parent_category}/${prod?.name_wine}`,
        },

        openGraph: {
            title: `${prod?.name_wine} — ${prod?.type} вино из Крыма`,
            description: `${prod?.type} вино ${prod?.name_wine}  сорта винограда ${prod?.sort} производство ${prod?.origin} винодельни «Два Петра»`,
            url: `https://two-peters.ru/collection/${prod?.parent_category}/${prod?.name_wine}`,
            images: [
                {
                    url: `https://two-peters.ru${getProductSrc(prod!)}`,
                    width: 1200,
                    height: 630,
                    alt: `${prod?.type} вино ${prod?.name_wine}  сорта винограда ${prod?.sort} производство ${prod?.origin} винодельни «Два Петра»`,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: `${prod?.name_wine} — ${prod?.type} вино из Крыма`,
            description: `${prod?.type} вино ${prod?.name_wine}  сорта винограда ${prod?.sort} производство ${prod?.origin} винодельни «Два Петра»`,
            images: [`https://two-peters.ru${getProductSrc(prod!)}`],
        },
    };
}
