import { apiService } from "@/services/ApiService";

export interface ContentFairsTypes {
    id: number;
    tag: string;
    text: string;
    href: string;
    position: number;
}

export interface FairInterface {
    id: number;
    active: 0 | 1;
    date_start: string;
    date_end: string;
    title_article: string;
    img_article: string;
    content: ContentFairsTypes[];
}

const PATH_FAIRS: string = "/uploads/fairs/";
export const DEFAULT_EXAMPLE: string = "/uploads/fairs/default/default.png";

export async function getGeneralFair() {
    try {
        const res = await apiService.postData<{ fair: FairInterface }>(
            "fairs-site",
            "get-current-fair",
            {},
        );

        if (res.success && res.data?.fair) {
            return res.data.fair;
        }

        return null;
    } catch (e) {
        return null;
    }
}

export async function getFairsRange(offset: number, limit: number = 20) {
    try {
        const res = await apiService.postData<{
            fairs: FairInterface[];
            total: number;
        }>("fairs-site", "get-fairs-range", { offset: offset, limit: limit });

        if (res.success && res.data?.fairs) {
            const data = {
                fairs: res.data!.fairs,
                total: res.data!.total,
            };

            return data;
        }

        return null;
    } catch (error) {
        return null;
    }
}

export async function getFairsByIds(ids: number[]) {
    try {
        const res = await apiService.postData<{
            fairs: FairInterface[];
        }>("fairs-site", "get-fairs-by-ids", { ids: ids });

        if (res.success && res.data?.fairs) {
            const data = {
                fairs: res.data!.fairs,
            };

            return data;
        }

        return null;
    } catch (error) {
        return null;
    }
}

export function getFairImage(id: number, image: string) {
    return `${PATH_FAIRS}${id}/${image}`;
}
