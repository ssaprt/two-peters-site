import { makeAutoObservable, runInAction } from "mobx";

class LayoutStore {
    //TODO loading elements
    arrLoad: Record<string, boolean> = {};
    ready: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    //TODO ready elements actions START -------------------------------
    get isReady() {
        return Object.values(this.arrLoad).every(Boolean);
    }

    addLoadElement = (name: string) => {
        runInAction(() => {
            this.arrLoad[name] = false;
        });
    };

    setLoadElement = (name: string) => {
        runInAction(() => {
            this.arrLoad[name] = true;
        });
    };
    //TODO ready elements actions END --------------------------------



    //! clear ready elements
    clear = () => {
        runInAction(() => {
            this.arrLoad = {};
            this.ready = false;
        });
    };
}

export const layoutStore = new LayoutStore();
