"use client";
import { makeAutoObservable, reaction } from "mobx";
import { scrollManager } from "./ScrollManager";

class HeaderStore {
    //TODO variables
    open: boolean = false;

    //TODO constructor
    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.open,
            (open) => {
                if (open) {
                    scrollManager.lock();
                } else {
                    scrollManager.unlock();
                }
            },
        );
    }

    //TODO toggle action
    toggleOpen = () => {
        this.open = !this.open;
    };

    //TODO getters
    get openHeader() {
        return this.open;
    }
}

export const headerStore = new HeaderStore();
