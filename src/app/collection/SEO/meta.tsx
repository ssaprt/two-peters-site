import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Винная коллекция",
    alternates: {
        canonical: "https://two-peters.ru/collection",
    },

    openGraph: {
        siteName: "Два Петра - винная коллекция",
        locale: "ru_RU",
        type: "website",
        title: "Винная коллекция Два Петра — вина высочайшего качества",
        description:
            "Коллекция вин, насыщенная богатым раззнообразием сортовых авторских вин от винодельни Два Петра",
        url: "/",
        images: [
            {
                url: "/og/collection/collection.png",
                width: 1200,
                height: 630,
                alt: "Коллекция вин, насыщенная богатым раззнообразием сортовых авторских вин от винодельни Два Петра",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Винная коллекция Два Петра — вина высочайшего качества",
        description:
            "Коллекция вин, насыщенная богатым раззнообразием сортовых авторских вин от винодельни Два Петра",
        images: ["/og/collection/collection.png"],
    },
};
