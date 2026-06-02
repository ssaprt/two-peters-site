"use client";

import { Time } from "@/stores/Time";
import { createContext, useContext } from "react";

interface AppContextType {
    isMobile: boolean;
    fixedHeader: boolean;
    setFixedHeader: (value: boolean) => void;
    needFillHeaderWithFixed: boolean;
    setNeedFillHeaderWithFixed: (value: boolean) => void;
    timeStore: Time;
    collection: number;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used inside AppProvider");
    }

    return context;
};
