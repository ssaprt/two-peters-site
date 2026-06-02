import {
    getCategoryFromId,
    getCollection,
    getCover,
} from "@/lib/api/Collection";
import { Metadata } from "next";

export async function generatePageMetadata(id: string): Promise<Metadata> {
    const categories = await getCollection();
    const category = getCategoryFromId(Number(id), categories!);

    return {
        title: `${category?.name}`,
        description: `Коллекция вин категории «${category?.name}» винодельни «Два Петра».`,

        alternates: {
            canonical: `https://two-peters.ru/collection/${id}`,
        },

        openGraph: {
            title: `${category?.name}`,
            description: `${category?.name} винодельни «Два Петра»`,
            url: `https://two-peters.ru/collection/${id}`,
            images: [
                {
                    url: `https://two-peters.ru${getCover(category!)}`,
                    width: 1200,
                    height: 630,
                    alt: category?.name,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: `Категория вин ${category?.name}`,
            description: `Категория вин ${category?.name} винодельни «Два Петра»`,
            images: [`https://two-peters.ru${getCover(category!)}`],
        },
    };
}
