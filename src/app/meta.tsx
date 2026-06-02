import { Metadata } from "next";

export const metadata: Metadata = {
    verification: {
        google: "xxxxxxxxxxxx",
        yandex: "xxxxxxxxxxxx",
    },

    metadataBase: new URL("https://two-peters.ru"),

    title: {
        default: "Два Петра — вина высочайшего качества",
        template: "%s | Два Петра",
    },

    description:
        "Винодельня Два Петра в Феодосии — авторские крымские вина, дегустации, экскурсии на виноградники и яхтинг. Откройте вкус восточного Крыма.",

    keywords: [
        "вино",
        "винодельня",
        "Крым",
        "Феодосия",
        "Два Петра",
        "купить вино",
        "винные туры",
        "винный туризм",
        "отдых на яхте",
        "экскурсии",
        "экскурсия",
        "винодельня Крым",
        "винодельня Феодосия",
        "авторское вино",
        "крымское вино",
        "винный туризм Крым",
        "дегустация вин",
        "экскурсия на винодельню",
        "виноградники Крыма",
        "купить крымское вино",
        "винные туры Феодосия",
        "отдых в Крыму",
        "яхтинг Крым",
    ],

    authors: [{ name: "Винодельня Два Петра", url: "https://two-peters.ru" }],
    category: "Вино и отдых",

    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },

    manifest: "/manifest.json",
    icons: {
        icon: [
            {
                url: "/favicons/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/favicons/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/favicons/favicon-96x96.png",
                sizes: "96x96",
                type: "image/png",
            },
        ],
        apple: [
            { url: "/favicons/apple-icon-57x57.png", sizes: "57x57" },
            { url: "/favicons/apple-icon-60x60.png", sizes: "60x60" },
            { url: "/favicons/apple-icon-76x76.png", sizes: "76x76" },
            { url: "/favicons/apple-icon-114x114.png", sizes: "114x114" },
            { url: "/favicons/apple-icon-120x120.png", sizes: "120x120" },
            { url: "/favicons/apple-icon-144x144.png", sizes: "144x144" },
            { url: "/favicons/apple-icon-152x152.png", sizes: "152x152" },
            { url: "/favicons/apple-icon-180x180.png", sizes: "180x180" },
            { url: "/favicons/apple-icon-precomposed.png" },
        ],
        other: [
            {
                rel: "msapplication-TileImage",
                url: "/favicons/ms-icon-144x144.png",
            },
        ],
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
