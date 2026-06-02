import { search } from "@/utils/search";
import { makeAutoObservable } from "mobx";

export class SearcherStore<T> {
    searchValue: string = "";
    getSource: () => T[];

    constructor(getSource: () => T[]) {
        makeAutoObservable(this);
        this.getSource = getSource;
    }

    setSearchValue = (value: string) => {
        this.searchValue = value;
    };

    get filterList(): T[] {
        return search(this.getSource(), this.searchValue);
    }
}
