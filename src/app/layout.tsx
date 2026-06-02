import { App } from "@/app/App";
import { headers } from "next/headers";
import "./styles/bottle.css";
import "./styles/carousel.css";
import "./styles/fonts.css";
import "./styles/globals.css";
import "./styles/mobile-scroll.css";
import "./styles/reset.css";
import "./styles/scrollbar.css";

import type { Viewport } from "next";
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#262626",
};

import { getCollection } from "@/lib/api/Collection";
import { metadata as baseMetaData } from "./meta";
export const metadata = baseMetaData;

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headersList = await headers();
    const ua = headersList.get("user-agent") || "";
    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            ua,
        );

    const categories = await getCollection();

    return (
        <html data-device={isMobile ? "mobile" : "desktop"} lang="ru">
            <body>
                <App
                    isMobile={isMobile}
                    collection={
                        categories!.length === 1 ? categories![0].id : 0
                    }
                >
                    {children}
                </App>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Winery",
                            "@id": "https://two-peters.ru/#organization",

                            name: "Два Петра",
                            description:
                                "Винодельня восточного Крыма. Производство авторских вин.",
                            url: "https://two-peters.ru",
                            image: "https://two-peters.ru/og/home/two-peters.png",
                            telephone: "+7-978-896-61-88",

                            address: {
                                "@type": "PostalAddress",
                                addressLocality: "Феодосия",
                                addressRegion: "Республика Крым",
                                addressCountry: "RU",
                            },
                        }),
                    }}
                />
            </body>
        </html>
    );
}
