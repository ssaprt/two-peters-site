"use client";
import { BlockWithButtonAndContent } from "@/components/blocks/BlockWithButtonAndContent/BlockWithButtonAndContent";
import { VideoFullBlock } from "@/components/blocks/video_full_block/VideoFullBlock";
import { Glasses } from "@/components/button/cinemaButtons/glasses/Glasses";
import ControlScrollSection from "@/components/ControlScrollSection/ControlScrollSection";
import { TitleSection } from "@/components/titles/TitleWithLogo/TitleSection";
import { UnControlScrollSection } from "@/components/UnControlScrollSection/UnControlScrollSection";
import { getVideoSrc, VideoPageType } from "@/lib/api/VideoPage";

import { FairInterface } from "@/lib/api/Fairs";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { FairsContent } from "./FairsContent/FairsContent";

type Props = {
    page: VideoPageType;
    initialFairs: {
        fairs: FairInterface[] | null;
        total: number;
    };
};

export const ClientFairsPage = ({ page, initialFairs }: Props) => {
    const { setNeedFillHeaderWithFixed, setFixedHeader, isMobile } =
        useAppContext();
    useEffect(() => {
        setFixedHeader(false);
        setNeedFillHeaderWithFixed(false);
    }, []);

    return (
        <>
            <ControlScrollSection id="block-1" transform={true} fillBg={true}>
                <BlockWithButtonAndContent
                    button={{
                        button: <Glasses />,
                        indexBlockToScroll: 1,
                    }}
                >
                    <VideoFullBlock
                        src={getVideoSrc(page, isMobile)}
                        id="block-1"
                    ></VideoFullBlock>
                </BlockWithButtonAndContent>
            </ControlScrollSection>
            <UnControlScrollSection id="block-2">
                <TitleSection title="События two-peters" />

                <FairsContent initialFairs={initialFairs} />
            </UnControlScrollSection>
        </>
    );
};
