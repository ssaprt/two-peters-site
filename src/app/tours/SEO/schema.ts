import { getTourImageSrc, TourBlock, TourDTO } from "@/lib/api/Tours";

export const schemaTours = (tours: TourDTO[]) => {
    const itemListElement = tours.map((tour, index) => {
        const tourBlocks = tour.blocks.filter(
            (block): block is TourBlock => block.type === "tour",
        );

        return {
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@id": `https://two-peters.ru/tours#tour-${tour.id}`,
                "@type": "TouristTrip",
                name: tour.title,
                touristType: "Wine tourism",
                location: {
                    "@type": "Place",
                    name: tour.address,
                },
                image: tour.images.length
                    ? `https://two-peters.ru${getTourImageSrc(tour.images[0], tour.id)}`
                    : undefined,
                ...(tourBlocks.length
                    ? {
                          offers: tourBlocks.map((block) => ({
                              "@type": "Offer",
                              name: block.data.title,
                              price: block.data.price,
                              priceCurrency: "RUB",
                              availability: "https://schema.org/InStock",
                          })),
                      }
                    : {}),
            },
        };
    });

    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://two-peters.ru/tours#page",
        name: "Туры винодельни Два Петра",
        description:
            "Винные туры и дегустации на винодельне Два Петра в Крыму.",
        url: "https://two-peters.ru/tours",
        about: {
            "@id": "https://two-peters.ru/#organization",
        },
        mainEntity: {
            "@type": "ItemList",
            name: "Туры Два Петра",
            numberOfItems: tours.length,
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
            name: "Туры",
            item: "https://two-peters.ru/tours",
        },
    ],
};
