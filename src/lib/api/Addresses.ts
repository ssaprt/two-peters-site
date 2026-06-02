import { apiService } from "@/services/ApiService";

const PATH_ADDRESSES: string = "/uploads/addresses/";
export const DEFAULT_EXAMPLE_ADDRESSES: string =
    "/uploads/addresses/default/address.webp";

export interface DayTypes {
    id: number;
    day: number;
    start: string;
    end: string;
    address_id: number;
    day_off: 0 | 1;
}

export interface AddressType {
    // id: number
    id: number;
    // name: название магазина
    name: string;
    // адрес винодельни
    general: 0 | 1;
    // активен ли адрес
    active: 0 | 1;
    // город
    city: string;
    // address: адрес магазина
    address: string;
    //описание магазина
    description: string;
    //тип адреса
    type_address: string;
    //телефон
    phone_address: string;
    //изображение
    img_address: string;
    //связанные события
    fairs_ids: number[];
    //связанные дни
    days: DayTypes[];
    // зона
    timezone: string;
    cache?: number;
}

export async function getGeneralAddress() {
    try {
        const res = await apiService.postData<{ address: AddressType }>(
            "addresses-site",
            "get-current-address",
            {},
        );
        if (res.success && res.data?.address) {
            return res.data.address;
        }

        return null;
    } catch (e) {
        return null;
    }
}

export async function getAllAddresses() {
    try {
        const res = await apiService.postData<{
            addresses: AddressType[];
        }>("addresses-site", "get-addresses", {});

        if (res.success && res.data?.addresses) {
            return res.data!.addresses;
        }

        return null;
    } catch (error) {
        return null;
    }
}

export function getAddressImage(id: number, image: string) {
    return `${PATH_ADDRESSES}${id}/${image}`;
}
