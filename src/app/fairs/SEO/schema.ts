import { FairInterface, getFairImage } from "@/lib/api/Fairs";

const toISODate = (date: string) => date.replaceAll(".", "-");

const extractUrl = (fair: FairInterface) =>
    fair.content.find((item) => item.tag === "a")?.href;

const extractPhone = (fair: FairInterface) =>
    fair.content.find((item) => item.tag === "tel")?.href;

const extractDescription = (fair: FairInterface) =>
    fair.content
        .filter((item) => ["p", "span", "b", "i"].includes(item.tag))
        .map((item) => item.text)
        .join(" ")
        .slice(0, 500);

export const schemaFairs = (fairs: FairInterface[]) => {
    const itemListElement = fairs.map((fair, index) => ({
        "@type": "ListItem",

        position: index + 1,

        item: {
            "@id": `https://two-peters.ru/fairs/${fair.id}#event`,

            "@type": "Event",

            name: fair.title_article,

            startDate: toISODate(fair.date_start),

            endDate: toISODate(fair.date_end),

            image: `https://two-peters.ru${getFairImage(fair.id, fair.img_article)}`,

            description: extractDescription(fair),

            ...(extractUrl(fair)
                ? {
                      url: extractUrl(fair),
                  }
                : {}),

            ...(extractPhone(fair)
                ? {
                      telephone: extractPhone(fair),
                  }
                : {}),
        },
    }));

    return {
        "@context": "https://schema.org",

        "@type": "CollectionPage",

        "@id": "https://two-peters.ru/fairs#page",

        name: "Ярмарки и события винодельни Два Петра",

        description:
            "Ярмарки, фестивали и мероприятия, где представлена продукция винодельни Два Петра.",

        url: "https://two-peters.ru/fairs",

        about: {
            "@id": "https://two-peters.ru/#organization",
        },

        mainEntity: {
            "@type": "ItemList",

            name: "Ярмарки и события винодельни Два Петра",

            numberOfItems: fairs.length,

            itemListElement,
        },
    };
};

export const schemaFairsBreadCrumbs = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: "https://two-peters.ru",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "События и ярмарки",
            item: "https://two-peters.ru/fairs",
        },
    ],
};
