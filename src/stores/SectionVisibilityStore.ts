import { makeAutoObservable, toJS } from "mobx";

type SectionState = {
    visible: boolean;
    progress: number;
    transform: boolean;
    fillBg: boolean;
};

class SectionVisibilityStore {
    sections: HTMLElement[] = [];

    states = new Map<string, SectionState>();

    constructor() {
        makeAutoObservable(this);
    }

    collectSections() {
        this.sections = Array.from(
            document.querySelectorAll("[data-scroll-section]"),
        ) as HTMLElement[];
    }

    update() {
        this.clear();
        if (!this.sections.length) {
            this.collectSections();
        }

        const viewportHeight = window.innerHeight;

        for (const section of this.sections) {
            const rect = section.getBoundingClientRect();

            const visibleHeight =
                Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

            const progress = Math.max(0, visibleHeight / rect.height);

            const visible = progress > 0.5;

            const transform = section.dataset.transform;
            const fillBg = section.dataset.fillBg;

            const id = section.dataset.sectionId;

            if (!id) continue;

            this.states.set(id, {
                visible,
                progress,
                transform: transform === "true",
                fillBg: fillBg === "true",
            });
        }
    }

    get(id: string) {
        return (
            this.states.get(id) ?? {
                visible: false,
                progress: 0,
            }
        );
    }

    getTransformSection(): SectionState | null {
        for (const state of this.states.values()) {
            if (state.transform === true) {
                return toJS(state);
            }
        }
        return null;
    }

    getFillBgSection(): SectionState | null {
        for (const state of this.states.values()) {
            if (state.fillBg === true) {
                return toJS(state);
            }
        }
        return null;
    }

    clear() {
        this.sections = [];
        this.states.clear();
    }
}

export const sectionVisibilityStore = new SectionVisibilityStore();
