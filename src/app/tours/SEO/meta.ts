import { getTours } from "@/lib/api/Tours";
import { atEnd } from "@/utils/Tours/atEnd";

import { Metadata } from "next";

export async function generatePageMetadata(): Promise<Metadata> {
    const tours = await getTours();
    const count = tours?.length;

    return {
        title: `${atEnd(count || 100)} (${count || 100}) от винодельни`,
        description: `Приглашаем вас испытать опыт винного туризма на восточном побережье Крыма от организаторов и виноделов «Два Петра»`,

        alternates: {
            canonical: `https://two-peters.ru/tours`,
        },

        openGraph: {
            title: `${atEnd(count || 100)} (${count || 100}) от винодельни`,
            description: `Приглашаем вас испытать опыт винного туризма на восточном побережье Крыма от организаторов и виноделов «Два Петра»`,
            url: `https://two-peters.ru/tours`,
            images: [
                {
                    url: `/og/tours/tours.png`,
                    width: 1200,
                    height: 630,
                    alt: `Приглашаем вас испытать опыт винного туризма на восточном побережье Крыма от организаторов и виноделов «Два Петра»`,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: `${atEnd(count || 100)} (${count || 100}) от винодельни`,
            description: `Приглашаем вас испытать опыт винного туризма на восточном побережье Крыма от организаторов и виноделов «Два Петра»`,
            images: [`/og/tours/tours.png`],
        },
    };
}
