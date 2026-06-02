import { makeAutoObservable, reaction, runInAction } from "mobx";

export class BreadCrumbsStorage {
    public currentPage: string = "1";
    public itemsPerPage: number = 5;
    positionTrack: Record<string, string> = {};
    sizeTrack: Record<string, string> = {};
    startAnim: boolean = false;
    positionShadow: "to_left" | "to_right" = "to_right";
    differentPageForAnim: string = "1s";
    pendingPage: string | null = null;
    //eslint-disable-next-line
    allItems: any[] = [];
    sortFn: (<T>(items: T[]) => T[]) | null = null;

    private _previousPosition: { left: string; top: string } | null = null;
    private _positionUpdated: boolean = false;
    private _previousTotalPages: number = 0;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.currentPage,
            (currentPage, previousPage) => {
                const prev = Number(previousPage);
                const curr = Number(currentPage);

                if (prev < curr) {
                    this.positionShadow = "to_right";
                } else if (prev > curr) {
                    this.positionShadow = "to_left";
                }

                this.differentPageForAnim = `${Math.abs(prev - curr) || 1}s`;
                this._positionUpdated = false;
            },
        );

        reaction(
            () => this.getTotalPages,
            (totalPages) => {
                if (
                    this._previousTotalPages !== 0 &&
                    this._previousTotalPages !== totalPages
                ) {
                    runInAction(() => {
                        if (Number(this.currentPage) > totalPages) {
                            this.currentPage = String(totalPages || 1);
                        }
                    });
                }
                this._previousTotalPages = totalPages;
            },
        );
    }

    set setItemsPerPage(itemsPerPage: number) {
        runInAction(() => {
            this.itemsPerPage = itemsPerPage;
        });
    }

    private _hasPositionChanged(): boolean {
        if (!this._previousPosition) return true;
        if (!this.positionTrack.left || !this.positionTrack.top) return true;

        return (
            this._previousPosition.left !== this.positionTrack.left ||
            this._previousPosition.top !== this.positionTrack.top
        );
    }

    private _saveCurrentPosition(): void {
        if (!this.positionTrack.left || !this.positionTrack.top) return;

        this._previousPosition = {
            left: this.positionTrack.left,
            top: this.positionTrack.top,
        };
    }

    get currentPageNumber(): number {
        return Number(this.currentPage) || 1;
    }

    //eslint-disable-next-line
    get currentItems(): any[] {
        const start = (this.currentPageNumber - 1) * this.itemsPerPage;
        return this.allItems.slice(start, start + this.itemsPerPage);
    }

    get getTotalPages() {
        return Math.ceil(this.allItems.length / this.itemsPerPage);
    }

    setItems<T>(items: T[]): void {
        runInAction(() => {
            const oldTotalPages = this.getTotalPages;

            let newItems = items;

            if (this.sortFn) {
                newItems = this.sortFn(items);
            }

            this.allItems = newItems;

            const newTotalPages = this.getTotalPages;

            if (Number(this.currentPage) > newTotalPages) {
                this.currentPage = String(newTotalPages || 1);
            }

            if (oldTotalPages !== newTotalPages) {
                this._previousPosition = null;
            }
        });
    }

    addItem<T>(item: T): void {
        runInAction(() => {
            this.allItems.push(item);
        });
    }

    removeItem(id: number | string): void {
        runInAction(() => {
            //eslint-disable-next-line
            const index = this.allItems.findIndex(
                (item: any) => item.id === id,
            );
            if (index !== -1) {
                this.allItems.splice(index, 1);

                if (
                    this.currentItems.length === 0 &&
                    this.currentPageNumber > 1
                ) {
                    this.currentPage = String(this.currentPageNumber - 1);
                } else if (Number(this.currentPage) > this.getTotalPages) {
                    this.currentPage = String(this.getTotalPages || 1);
                }
            }
        });
    }

    startNavigateTo = (page: string): void => {
        if (this.startAnim || page === this.currentPage) return;

        runInAction(() => {
            const prev = this.currentPageNumber;
            const curr = Number(page);

            this.pendingPage = page;
            this.positionShadow = prev < curr ? "to_right" : "to_left";
            this.differentPageForAnim = `${Math.abs(prev - curr) || 1}s`;
            this.startAnim = true;
        });
    };

    commitPendingPage = (): void => {
        runInAction(() => {
            if (this.pendingPage !== null) {
                this.currentPage = this.pendingPage;
                this.pendingPage = null;
            }
            this._saveCurrentPosition();
            this.startAnim = false;
        });
    };

    // оставляем для совместимости с ButtonPage и внешних вызовов
    navigateToPage = (page: string | null): void => {
        const targetPage = page !== null ? page : "1";
        this.startNavigateTo(targetPage);
    };

    setPosition = (x: number, y: number): void => {
        runInAction(() => {
            this.positionTrack = {
                left: `${x}px`,
                top: `${y}px`,
            };
        });
    };

    setSize = (width: number, height: number): void => {
        runInAction(() => {
            this.sizeTrack = {
                width: `${width}px`,
                height: `${height}px`,
            };
        });
    };

    setStartAnimation = (start: boolean): void => {
        runInAction(() => {
            this.startAnim = start;
            if (!start) {
                this._saveCurrentPosition();
            }
        });
    };

    get hasNextPage(): boolean {
        return Number(this.currentPage) < this.getTotalPages;
    }

    get hasPrevPage(): boolean {
        return Number(this.currentPage) > 1;
    }

    clear = (): void => {
        runInAction(() => {
            this.positionTrack = {};
            this.sizeTrack = {};
            this.currentPage = "1";
            this.pendingPage = null;
            this._previousPosition = null;
            this.allItems = [];
            this.startAnim = false;
        });
    };
}

export const breadCrumbsStorageAddresses = new BreadCrumbsStorage();
