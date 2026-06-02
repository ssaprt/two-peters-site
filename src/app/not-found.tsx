"use client";
import ControlScrollSection from "@/components/ControlScrollSection/ControlScrollSection";
import { layoutStore } from "@/stores/LayoutStore";
import { useEffect } from "react";
import { useAppContext } from "./context/AppContext";
import { NotFound as NF } from "./NotFound/NotFound";

export default function NotFound() {
    const { setFixedHeader, setNeedFillHeaderWithFixed } = useAppContext();
    useEffect(() => {
        setFixedHeader(true);
        setNeedFillHeaderWithFixed(false);
        let timeOut;
        layoutStore.addLoadElement("not-found");
        timeOut = setTimeout(
            () => layoutStore.setLoadElement("not-found"),
            1000,
        );
        return () => clearTimeout(timeOut);
    }, []);
    return (
        <ControlScrollSection id="not-found" transform={false}>
            <NF />
        </ControlScrollSection>
    );
}
