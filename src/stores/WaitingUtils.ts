import { makeObservable } from "mobx";

export interface WaitingUtilsProps {
    error?: string | undefined;
    waiting: boolean | undefined;
    success?: boolean;
    response?: boolean;
    message?: string;
    viewResultAfterLoader: boolean;
}

export class WaitingUtils {
    error?: string | undefined;
    waiting: boolean | undefined;
    success?: boolean;
    response?: boolean = false;
    message?: string;
    viewResultAfterLoader: boolean = false;

    constructor() {
        makeObservable(this);
    }

    setViewResultAfterLoader = (value: boolean): void => {
        this.viewResultAfterLoader = value;
    };

    setWaiting = (value: boolean): void => {
        this.waiting = value;
    };

    clear = () => {
        this.error = "";
        this.waiting = false;
        this.success = undefined;
        this.response = false;
        this.message = undefined;
        this.viewResultAfterLoader = false;
    };
}
