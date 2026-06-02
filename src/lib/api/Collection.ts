import { apiService } from "@/services/ApiService";

const PATH = "/uploads/categories/";

export type CategoryInterface = {
    id: number;
    active: 0 | 1;
    name: string;
    cover: string;
    substrate: string;
    new_category?: boolean;
    cashe?: number;
};

export async function getCollection() {
    try {
        const res = await apiService.postData<{
            categories: CategoryInterface[];
        }>("categories-site", "get-categories", {});
        if (res.success && res.data?.categories) {
            return res.data.categories;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export function getCategoryFromId(id: number, categories: CategoryInterface[]) {
    return categories.find((item) => item.id === id);
}

export function getCover(item: CategoryInterface) {
    return `${PATH}${item.id}/${item.cover}`;
}

export function getSubstrate(item: CategoryInterface) {
    return `${PATH}${item.id}/${item.substrate}`;
}
