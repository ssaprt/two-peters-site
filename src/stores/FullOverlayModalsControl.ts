import { makeAutoObservable, runInAction } from "mobx";

export class FullOverlayModalsControl {
    open: boolean = false;
    message: string = "";
    success: boolean | undefined = undefined;
    timer: ReturnType<typeof setTimeout> | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get openModal(): boolean {
        return this.open;
    }

    get messageModal(): string {
        return this.message;
    }

    setMessage(message: string, success?: boolean): void {
        this.clearTimer(); // ← Очищаем перед открытием нового
        runInAction(() => {
            this.open = true;
            this.message = message;
            this.success = success;
        });
    }

    isOpen(): void {
        this.clearTimer();
        runInAction(() => {
            this.open = true;
        });
    }

    isHide = (): void => {
        this.clearTimer();
        runInAction(() => {
            this.open = false;
        });
    };

    startHide = (): void => {
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.isHide();
        }, 2000);
    };

    clearTimer = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };

    clearModal = () => {
        this.clearTimer();
        runInAction(() => {
            this.open = false;
            this.message = "";
            this.timer = null;
            this.success = undefined;
        });
    };

    dispose = () => {
        this.clearTimer();
    };
}
