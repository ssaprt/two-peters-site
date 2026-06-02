import { AddressType, getAddressImage } from "@/lib/api/Addresses";
import { getFairsByIds } from "@/lib/api/Fairs";

function getSchemaType(type: string) {
    switch (type.toLowerCase()) {
        case "магазин":
            return "Store";

        case "ресторан":
            return "Restaurant";

        case "винодельня":
            return "Winery";

        default:
            return "Place";
    }
}

const toISODate = (date: string) => date.replaceAll(".", "-");

export const schemaAddresses = async (addresses: AddressType[]) => {
    const itemListElement = await Promise.all(
        addresses.map(async (address, index) => {
            const fairsResponse = address.fairs_ids?.length
                ? await getFairsByIds(address.fairs_ids)
                : null;

            const fairs = fairsResponse?.fairs ?? [];

            return {
                "@type": "ListItem",

                position: index + 1,

                item: {
                    "@id": `https://two-peters.ru/addresses#place-${address.id}`,

                    "@type": getSchemaType(address.type_address),

                    name: address.name,

                    description: address.description,

                    image: `https://two-peters.ru${getAddressImage(address.id, address.img_address)}`,

                    telephone: address.phone_address,

                    address: {
                        "@type": "PostalAddress",

                        addressLocality: address.city,

                        streetAddress: address.address,

                        addressCountry: "RU",
                    },

                    ...(fairs?.length
                        ? {
                              subjectOf: fairs.map((fair) => ({
                                  "@type": "Event",

                                  "@id": `https://two-peters.ru/fairs/${fair.id}#event`,

                                  name: fair.title_article,

                                  startDate: toISODate(fair.date_start),

                                  endDate: toISODate(fair.date_end),

                                  image: `https://two-peters.ru${fair.img_article}`,

                                  location: {
                                      "@id": `https://two-peters.ru/addresses#place-${address.id}`,
                                  },
                              })),
                          }
                        : {}),
                },
            };
        }),
    );

    return {
        "@context": "https://schema.org",

        "@type": "CollectionPage",

        "@id": "https://two-peters.ru/addresses#page",

        name: "Где купить вино Два Петра",

        description:
            "Точки продаж винодельни Два Петра: магазины, рестораны и винодельни.",

        url: "https://two-peters.ru/addresses",

        about: {
            "@id": "https://two-peters.ru/#organization",
        },

        mainEntity: {
            "@type": "ItemList",

            name: "Точки продаж вина Два Петра",

            numberOfItems: addresses.length,

            itemListElement,
        },
    };
};

export const schemaBreadCrumbs = {
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
            name: "Где купить",
            item: "https://two-peters.ru/addresses",
        },
    ],
};
