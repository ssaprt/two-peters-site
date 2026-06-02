import { AddressType, getAddressImage } from "@/lib/api/Addresses";

export const schemaContacts = (address: AddressType) => ({
    "@context": "https://schema.org",

    "@type": "ContactPage",

    "@id": "https://two-peters.ru/contacts#page",

    name: "Контакты винодельни Два Петра",

    description:
        "Контактная информация винодельни Два Петра. Телефоны, электронная почта, социальные сети и адрес.",

    url: "https://two-peters.ru/contacts",

    mainEntity: {
        "@type": "Winery",

        "@id": "https://two-peters.ru/#organization",

        name: "Два Петра",

        url: "https://two-peters.ru",

        email: "mailto:spdolinavin@mail.ru",

        image: `https://two-peters.ru${getAddressImage(
            address.id,
            address.img_address,
        )}`,

        description: address.description,

        telephone: address.phone_address,

        address: {
            "@type": "PostalAddress",
            addressLocality: address.city,
            streetAddress: address.address,
            addressCountry: "RU",
        },

        contactPoint: [
            {
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: address.phone_address,
                email: "spdolinavin@mail.ru",
                availableLanguage: ["ru"],
            },
            {
                "@type": "ContactPoint",
                contactType: "sales",
                telephone: "+79788660095",
                availableLanguage: ["ru"],
            },
            {
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: "+79788966188",
                availableLanguage: ["ru"],
            },
        ],

        sameAs: ["https://t.me/TWOPETERS"],
    },
});

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
            name: "Контакты",
            item: "https://two-peters.ru/contacts",
        },
    ],
};
