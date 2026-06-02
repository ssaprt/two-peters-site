import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Винная коллекция",
    alternates: {
        canonical: "https://two-peters.ru",
    },

    openGraph: {
        siteName: "Два Петра",
        locale: "ru_RU",
        type: "website",
        title: "Два Петра — вина высочайшего качества",
        description:
            "Окунитесь в мир вин высочайшего качества. Производство винодельни восточного Крыма Два Петра",
        url: "/",
        images: [
            {
                url: "/og/home/two-peters.png",
                width: 1200,
                height: 630,
                alt: "Два Петра — вина высочайшего качества. Винодельня восточного Крыма в г. Феодосия",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Два Петра — вина высочайшего качества",
        description:
            "Окунитесь в мир вин высочайшего качества. Производство винодельни восточного Крыма Два Петра",
        images: ["/og/home/two-peters.png"],
    },
};
