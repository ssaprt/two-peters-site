"use client";
import { BlockWithButtonAndContent } from "@/components/blocks/BlockWithButtonAndContent/BlockWithButtonAndContent";
import { VideoFullBlock } from "@/components/blocks/video_full_block/VideoFullBlock";
import { Glasses } from "@/components/button/cinemaButtons/glasses/Glasses";
import ControlScrollSection from "@/components/ControlScrollSection/ControlScrollSection";
import { TitleSection } from "@/components/titles/TitleWithLogo/TitleSection";
import { UnControlScrollSection } from "@/components/UnControlScrollSection/UnControlScrollSection";
import { TourDTO } from "@/lib/api/Tours";
import { getVideoSrc, VideoPageType } from "@/lib/api/VideoPage";
import { layoutStore } from "@/stores/LayoutStore";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Tours } from "./Tours/Tours";

export const ClientToursPage = ({
    video,
    tours,
}: {
    video: VideoPageType;
    tours: TourDTO[];
}) => {
    const { setNeedFillHeaderWithFixed, setFixedHeader, isMobile } =
        useAppContext();
    useEffect(() => {
        let timeOut: NodeJS.Timeout;
        setFixedHeader(false);
        setNeedFillHeaderWithFixed(false);
        layoutStore.addLoadElement("tours");
        timeOut = setTimeout(() => layoutStore.setLoadElement("tours"), 1000);
        return () => clearTimeout(timeOut);
    }, []);

    return (
        <>
            {/* <div style={{ display: "none" }}> */}
            <ControlScrollSection id="block-1" fillBg={true}>
                <BlockWithButtonAndContent
                    button={{
                        button: <Glasses />,
                        indexBlockToScroll: 1,
                    }}
                >
                    <VideoFullBlock
                        src={getVideoSrc(video, isMobile)}
                        id="block-1"
                    ></VideoFullBlock>
                </BlockWithButtonAndContent>
            </ControlScrollSection>
            {/* </div> */}
            <UnControlScrollSection id="block-2">
                <TitleSection
                    title="Туры two-peters"
                    style={{ textAlign: "center" }}
                />
                <Tours tours={tours} />
            </UnControlScrollSection>
        </>
    );
};
