import { CategoryInterface } from "@/lib/api/Collection";
import { getProductSrc, ProductInterface } from "@/lib/api/Products";

export const schema = (
    prod: ProductInterface,
    category: CategoryInterface,
) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://two-peters.ru/collection/${prod?.parent_category}/${prod?.name_wine}#product`,

    name: prod?.name_wine,

    description: `${prod?.type} вино ${prod?.name_wine} сорта ${prod?.sort}`,

    image: `https://two-peters.ru${getProductSrc(prod!)}`,

    brand: {
        "@id": "https://two-peters.ru/#organization",
    },

    manufacturer: {
        "@id": "https://two-peters.ru/#organization",
    },

    category: category?.name || "Авторские вина",

    additionalProperty: [
        {
            "@type": "PropertyValue",
            name: "Тип вина",
            value: prod?.type,
        },
        {
            "@type": "PropertyValue",
            name: "Сорт винограда",
            value: prod?.sort,
        },
        {
            "@type": "PropertyValue",
            name: "Происхождение",
            value: prod?.origin,
        },
        {
            "@type": "PropertyValue",
            name: "Содержание спирта",
            value: prod?.spirt,
        },
        {
            "@type": "PropertyValue",
            name: "Выдержка",
            value: prod?.seading || "12 месяцев",
        },
        {
            "@type": "PropertyValue",
            name: "Объем",
            value: prod?.mass || 750,
        },
    ],
    isRelatedTo: {
        "@id": `https://two-peters.ru/collection/${prod?.parent_category}#page`,
    },
    weight: {
        "@type": "QuantitativeValue",
        value: prod?.mass || 750,
        unitCode: "MLT",
    },
});

export const schemaBreadCrumbs = (
    product: ProductInterface,
    categoryName: string,
) => ({
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
            item: `https://two-peters.ru/collection/${product.parent_category}/${product.name_wine}`,
        },
    ],
});
