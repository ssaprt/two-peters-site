"use client";

import { sectionVisibilityStore } from "@/stores/SectionVisibilityStore";

export const useSectionVisibility = (id: string) => {
    return sectionVisibilityStore.get(id);
};
