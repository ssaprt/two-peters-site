const API_URL =
    typeof window === "undefined"
        ? process.env.API_URL
        : process.env.NEXT_PUBLIC_API_URL;

type ImageFileType = {
    id: number;
    image: string;
};

export type ImageWithCaption = ImageFileType & {
    caption: string;
};

export type ImageOnly = ImageFileType & {
    image: string;
};

export interface ContentBlock {
    textTop: string;

    firstPair: [ImageWithCaption, ImageWithCaption];

    textMiddle: string;

    secondPair: [ImageWithCaption, ImageWithCaption];

    textBottom: string;

    finalImage: ImageOnly;
}

const PATH: string = "/uploads/tour_general_page/";

function isPairKey(key: string): key is "firstPair" | "secondPair" {
    return key === "firstPair" || key === "secondPair";
}

export async function getGeneralTour() {
    try {
        const res = await fetch(
            API_URL + "/uploads/tour_general_page/general-page-tour.json",
        );
        const data: ContentBlock = await res.json();

        return data ?? null;
    } catch (e) {
        return null;
    }
}

export function getImageGeneralTour(
    tour: ContentBlock,
    stringKey: string,
    id?: number,
    position?: number,
) {
    if (isPairKey(stringKey) && position !== undefined) {
        return PATH + `${id}/` + tour?.[stringKey][position].image;
    }

    return PATH + "5/" + tour?.finalImage.image;
}
