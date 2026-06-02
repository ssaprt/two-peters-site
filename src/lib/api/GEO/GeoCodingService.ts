import { universalServices } from "../../../services/ApiService";

export type GeoType = {
    id: number;
    full_name: string;
    city: string;
    timezone: string;
};

class GeoService {
    async getGeoInfo(searchValue: string): Promise<GeoType[] | []> {
        try {
            const response = await universalServices.getData<{
                cities: GeoType[];
            }>(`geo`, "get-cities", { search: searchValue }, "get");

            if (response.success && response.data) {
                if (response.data.cities.length > 0) {
                    return response.data.cities;
                }
            }

            return [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export const geoService = new GeoService();
