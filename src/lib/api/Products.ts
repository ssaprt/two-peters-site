import { apiService } from "@/services/ApiService";
import { CategoryInterface } from "./Collection";

const PATH = "/uploads/products/";
const DEFAULT_PATH = `${PATH}default/product.png`;

export type Award = {
    id: number;
    name: string;
    fair_id: number;
    wine_id: number;
    image_award: string;
};

export interface ProductInterface {
    id: number;
    parent_category: number;
    active: 0 | 1;
    img: string;
    name_wine: string;
    description: string;
    type: string;
    sort: string;
    origin: number;
    spirt: string;
    seading: string;
    mass: number;
    sertificat: string;
    price: number;
    old_price: number;
    adressess_sell: string;
    buy: 0 | 1;
    awards: Award[] | null;
}

// export async function getProducts() {
//     try {
//         const res = await apiService.postData<{ products: ProductInterface[] }>(
//             "products-site",
//             "get-products",
//             {},
//         );

//         if (res.success && res.data?.products) {
//             return res.data.products;
//         }
//         return null;
//     } catch (error) {
//         return null;
//     }
// }

export async function getProductsFromIdCategory(id: number) {
    try {
        const res = await apiService.postData<{ products: ProductInterface[] }>(
            "products-site",
            "get-products-by-category",
            { id: id },
        );

        if (res.success && res.data?.products) {
            return res.data.products;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export async function getProductByName(name: string) {
    try {
        const res = await apiService.postData<{ product: ProductInterface }>(
            "products-site",
            "get-product-by-name",
            { name: name },
        );

        if (res.success && res.data?.product) {
            return res.data.product;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export function getSubstrateProduct(category: CategoryInterface) {
    return category.substrate
        ? `/uploads/categories/${category.id}/${category.substrate}`
        : "/uploads/categories/default_substrate/default.png";
}

export function getAwardSrc(award: Award) {
    return award.image_award
        ? `/uploads/awards/${award.id}/${award.image_award}`
        : "/uploads/awards/default/award.svg";
}

export function getProductSrc(product: ProductInterface) {
    return product.img ? `${PATH}${product.id}/${product.img}` : DEFAULT_PATH;
}
