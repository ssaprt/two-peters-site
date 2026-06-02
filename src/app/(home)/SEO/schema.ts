import { AddressType, getAddressImage } from "@/lib/api/Addresses";
import { FairInterface, getFairImage } from "@/lib/api/Fairs";
import { ContentBlock, getImageGeneralTour } from "@/lib/api/GeneralTour";

const toISODate = (date: string) => date.replaceAll(".", "-");

type Props = {
    fair: FairInterface | null;
    address: AddressType;
    tourism: ContentBlock;
};

export const tourismArticleSchema = (tourism: ContentBlock) => ({
    "@type": "Article",

    "@id": "https://two-peters.ru/#tours-article",

    headline: "Винный туризм в восточном Крыму: экскурсии, дегустации и отдых",

    description: (tourism?.textTop || "").slice(0, 300),

    author: {
        "@id": "https://two-peters.ru/#organization",
    },

    publisher: {
        "@id": "https://two-peters.ru/#organization",
    },

    image: [
        getImageGeneralTour(tourism, "firstPair", 1, 0),
        getImageGeneralTour(tourism, "firstPair", 1, 1),
        getImageGeneralTour(tourism, "secondPair", 2, 0),
        getImageGeneralTour(tourism, "secondPair", 2, 1),
        getImageGeneralTour(tourism, "finalImage"),
    ].map((img) => `https://two-peters.ru${img}`),

    articleBody: [tourism?.textTop, tourism?.textMiddle, tourism?.textBottom]
        .join("\n\n")
        .slice(0, 3000),
});

export const schemaHome = ({ fair, address, tourism }: Props) => ({
    "@context": "https://schema.org",

    "@graph": [
        {
            "@type": "WebPage",

            "@id": "https://two-peters.ru/#homepage",

            url: "https://two-peters.ru",

            name: "Два Петра — вина высочайшего качества",

            description:
                "Авторские вина восточного Крыма. Экскурсии по винодельне, дегустации, винные туры и коллекция вин Два Петра.",

            about: {
                "@id": "https://two-peters.ru/#organization",
            },

            mainEntity: [
                {
                    "@id": "https://two-peters.ru/contacts#winery",
                },

                {
                    "@id": "https://two-peters.ru/tours#service",
                },

                {
                    "@id": "https://two-peters.ru/#tourism-article",
                },

                {
                    "@id": "https://two-peters.ru/collection#page",
                },

                ...(fair
                    ? [
                          {
                              "@id": `https://two-peters.ru/fairs/${fair.id}#event`,
                          },
                      ]
                    : []),
            ],
        },

        {
            "@type": "Place",

            "@id": "https://two-peters.ru/contacts#winery",

            name: "Винодельня Два Петра",

            image: `https://two-peters.ru${getAddressImage(
                address.id,
                address.img_address,
            )}`,

            address: {
                "@type": "PostalAddress",

                streetAddress: address.address,

                addressLocality: address.city,

                addressCountry: "RU",
            },

            telephone: address.phone_address,
        },

        {
            "@type": "Service",

            "@id": "https://two-peters.ru/tours#service",

            name: "Экскурсии и винные туры",

            description:
                "Экскурсии по винодельне, дегустации вин и посещение виноградников восточного Крыма.",

            provider: {
                "@id": "https://two-peters.ru/#organization",
            },

            areaServed: {
                "@type": "Place",
                name: "Крым",
            },
        },

        {
            "@type": "CollectionPage",

            "@id": "https://two-peters.ru/collection#page",

            url: "https://two-peters.ru/collection",

            name: "Коллекция вин Два Петра",

            about: {
                "@id": "https://two-peters.ru/#organization",
            },
        },

        tourismArticleSchema(tourism),

        ...(fair
            ? [
                  {
                      "@type": "Event",

                      "@id": `https://two-peters.ru/fairs/${fair.id}#event`,

                      name: fair.title_article,

                      startDate: toISODate(fair.date_start),

                      endDate: toISODate(fair.date_end),

                      image: `https://two-peters.ru${getFairImage(
                          fair.id,
                          fair.img_article,
                      )}`,

                      organizer: {
                          "@id": "https://two-peters.ru/#organization",
                      },

                      location: {
                          "@id": "https://two-peters.ru/contacts#winery",
                      },
                  },
              ]
            : []),
    ],
});
