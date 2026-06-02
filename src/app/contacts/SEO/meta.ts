import { Metadata } from "next";

export async function generatePageMetadata(): Promise<Metadata> {
    return {
        title: `Контакты винодельни «Два Петра»`,
        description: `Контактная информация винодельни Два Петра. Телефоны, электронная почта, социальные сети и адрес.`,

        alternates: {
            canonical: `https://two-peters.ru/contacts`,
        },

        openGraph: {
            title: `Контакты винодельни «Два Петра»`,
            description: `Контактная информация винодельни Два Петра. Телефоны, электронная почта, социальные сети и адрес.`,
            url: `https://two-peters.ru/addresses`,
            images: [
                {
                    url: `https://two-peters.ru/uploads/addresses/default/address.webp`,
                    width: 1200,
                    height: 630,
                    alt: `Контактная информация винодельни Два Петра. Телефоны, электронная почта, социальные сети и адрес.`,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: `Контакты винодельни «Два Петра»`,
            description: `Контактная информация винодельни Два Петра. Телефоны, электронная почта, социальные сети и адрес.`,
            images: [
                `https://two-peters.ru/uploads/addresses/default/address.webp`,
            ],
        },
    };
}
