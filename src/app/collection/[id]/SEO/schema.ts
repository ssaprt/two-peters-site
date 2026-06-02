import { CategoryInterface } from "@/lib/api/Collection";
import { ProductInterface } from "@/lib/api/Products";

export const schemaBreadCrumbs = (id: number, categoryName: string) => ({
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
        {
            "@type": "ListItem",
            position: 3,
            name: categoryName,
            item: `https://two-peters.ru/collection/${id}`,
        },
    ],
});

export const schema = (
    id: number,
    category: CategoryInterface,
    products: ProductInterface[],
) => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://two-peters.ru/collection/${id}#page`,

    name: `${category?.name} вина`,
    description: `Коллекция вин категории «${category?.name}» винодельни «Два Петра».`,
    url: `https://two-peters.ru/collection/${id}`,

    about: {
        "@id": "https://two-peters.ru/#organization",
    },

    mainEntity: {
        "@type": "ItemList",
        name: category?.name,
        itemListElement: products?.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name_wine,
            url: `https://two-peters.ru/collection/${product.parent_category}/${product.name_wine}`,
        })),
    },
});
