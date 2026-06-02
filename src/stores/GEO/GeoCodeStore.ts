import { geoService, GeoType } from "@/lib/api/GEO/GeoCodingService";
import { makeAutoObservable, runInAction } from "mobx";

export class City {
    id: number;
    name: string;
    lat: string;
    lon: string;
    full_name: string;
    timezone: string;

    constructor(data: GeoType) {
        this.id = data.id;
        this.name = data.city;
        this.lat = data.city;
        this.lon = data.city;
        this.full_name = data.full_name;
        this.timezone = data.timezone;

        makeAutoObservable(this);
    }
}

class GeoCodeStore {
    geoArray: City[] = [];
    selected: City | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    clearArray = () => {
        this.geoArray = [];
    };

    startLoading = () => {
        this.loading = true;
    };

    endLoading = () => {
        this.loading = false;
    };

    async searchResult(searchValue: string) {
        if (searchValue.length < 3) {
            this.geoArray = [];
            this.endLoading();
            return;
        }

        this.startLoading();

        try {
            const response = await geoService.getGeoInfo(searchValue);
            runInAction(() => {
                if (response) {
                    this.geoArray = response.map((item) => new City(item));
                } else {
                    this.geoArray = [];
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    setSelected = (instance: City) => {
        this.selected = instance;
    };

    clear() {
        this.geoArray = [];
        this.selected = null;
    }
}

export const geoCodeStore = new GeoCodeStore();
