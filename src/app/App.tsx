"use client";

import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { DefaultLoader } from "@/components/loaders/DefaultLoader/DefaultLoader";
import { Tooltip } from "@/components/modals/Tooltip/Tooltip";
import Scrollbar from "@/components/scrollbar/ScrollBar/ScrollBar";
import { ToTop } from "@/components/ToTop/ToTop";
import { useApp } from "@/hooks/Utils/useApp";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { AgeGateModal } from "./AgeGateModal";
import { AppContext } from "./context/AppContext";
import { ScrollProvider } from "./providers/ScrollProvider";

interface Props {
    isMobile: boolean;

    children: ReactNode;
    collection: number;
}

export const App = observer(({ isMobile, children, collection }: Props) => {
    const {
        isReady,
        scrollRef,
        styleLoader,
        forScroll,
        stylesForScrollBlock,
        fixedHeader,
        setFixedHeader,
        needFillHeaderWithFixed,
        setNeedFillHeaderWithFixed,
        unmountLoader,
        setUnmountLoader,
        timeStore,
    } = useApp(isMobile);

    return (
        <AppContext.Provider
            value={{
                isMobile,
                fixedHeader,
                setFixedHeader,
                needFillHeaderWithFixed,
                setNeedFillHeaderWithFixed,
                timeStore,
                collection,
            }}
        >
            <AgeGateModal />
            <Tooltip />
            <Header />
            <div ref={scrollRef} className={stylesForScrollBlock}>
                <div className=" will-change-transform">
                    <ScrollProvider scrollRef={scrollRef}>
                        {children}
                    </ScrollProvider>
                    <Footer />
                </div>
            </div>
            <ToTop />

            <Scrollbar {...forScroll} />

            {!unmountLoader && (
                <DefaultLoader
                    style={{
                        ...styleLoader,
                    }}
                    elementIsReady={isReady}
                    callBackEndAnimation={() => setUnmountLoader(true)}
                />
            )}
        </AppContext.Provider>
    );
});
