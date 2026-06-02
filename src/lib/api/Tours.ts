import { apiService } from "@/services/ApiService";

const PATH_TO_IMAGES = "/uploads/tours/";

export type BaseBlock<T extends string, D> = {
    id: string;
    type: T;
    data: D;
};

// blocks

export type TourBlock = BaseBlock<
    "tour",
    {
        title: string;
        price: string;
        features: {
            id: string;
            text: string;
        }[];
    }
>;

export type AdditionalBlock = BaseBlock<
    "additional",
    {
        title: string;
        items: { id: string; text: string; price: string }[];
    }
>;

export type BookingBlock = BaseBlock<
    "booking",
    {
        phone: string;
        text: string;
    }
>;

export type TourismBlock = TourBlock | AdditionalBlock | BookingBlock;

export type TourDTO = {
    id: string;
    title: string;
    address: string;
    active: 1 | 0;
    blocks: TourismBlock[];
    images: string[];
};

export type Tour = {
    id: number;
    title: string;
    address: string;
    active: 0 | 1;
    blocks: TourismBlock[];
    images: string[];
};

export async function getTours() {
    try {
        const res = await apiService.postData<{
            tours: TourDTO[];
        }>("tours-site", "get-tours", {});
        if (res.success && res.data?.tours) {
            return res.data.tours.map((tour) => ({
                ...tour,
                images: JSON.parse(tour.images as unknown as string),
                blocks: JSON.parse(tour.blocks as unknown as string),
            }));
        }
        return null;
    } catch (error) {
        return null;
    }
}

export function getTourImageSrc(image: string, id: string) {
    return `${PATH_TO_IMAGES}${id}/${image}`;
}
