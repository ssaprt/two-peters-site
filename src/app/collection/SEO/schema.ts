import { CategoryInterface } from "@/lib/api/Collection";

export const schema = (categories: CategoryInterface[]) => {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://two-peters.ru/collection#page",

        name: "Винная коллекция Два Петра",
        description: "Коллекция сортовых и авторских вин винодельни Два Петра.",
        url: "https://two-peters.ru/collection",

        about: {
            "@id": "https://two-peters.ru/#organization",
        },

        mainEntity: {
            "@type": "ItemList",
            name: "Коллекция вин",
            itemListElement: categories.map((category, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: category.name,
                url: `https://two-peters.ru/collection/${category.id}`,
            })),
        },
    };
};

export const schemaBreadCrumbs = () => ({
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
            name: "Коллекция вин",
            item: "https://two-peters.ru/collection",
        },
    ],
});
