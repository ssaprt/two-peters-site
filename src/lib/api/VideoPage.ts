import { apiService } from "@/services/ApiService";

export type VideoPageType = {
    id: number;
    video: string;
    mobile: string;
};

export async function getVideoPage(index: number): Promise<VideoPageType> {
    const res = await apiService.postData<{
        page: VideoPageType;
    }>("video-pages-site", "get-video-page", { index });

    if (!res.data?.page) {
        throw new Error("Page not found");
    }

    return res.data.page;
}

const PATH = "/uploads/video_pages/";
const DEFAULT_PATH = `${PATH}/default/default.mp4`;

export function getVideoSrc(page: VideoPageType, isMobile: boolean) {
    const folder = isMobile ? "mobile" : "video";
    const file = `${page.id}/${folder}/${isMobile ? page.mobile : page.video}`;

    return file ? PATH + file : DEFAULT_PATH;
}
