"use client";
import { BlockWithButtonAndContent } from "@/components/blocks/BlockWithButtonAndContent/BlockWithButtonAndContent";
import { VideoFullBlock } from "@/components/blocks/video_full_block/VideoFullBlock";
//import { Fairs } from "@/components/button/cinemaButtons/Fairs/Fairs";
import PhoneIcon from "@/assets/icons/fairs/call.svg";
import { ButtonWithSvg } from "@/components/button/buttonWithSvg/buttonWithSvg";
import { Glasses } from "@/components/button/cinemaButtons/glasses/Glasses";
import { Contacts } from "@/components/Contacts/Contacts";
import ControlScrollSection from "@/components/ControlScrollSection/ControlScrollSection";
import { HrBlocks } from "@/components/hr/HrBlocks/HrBlocks";
import { TitleSection } from "@/components/titles/TitleWithLogo/TitleSection";
import { UnControlScrollSection } from "@/components/UnControlScrollSection/UnControlScrollSection";
import { AddressType } from "@/lib/api/Addresses";
import { FairInterface } from "@/lib/api/Fairs";
import { ContentBlock } from "@/lib/api/GeneralTour";
import { getVideoSrc, VideoPageType } from "@/lib/api/VideoPage";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { FirstBlock } from "./FirstBlock/FirstBlock";
import { GeneralAddress } from "./GeneralAddress/GeneralAddress";
import { GeneralFair } from "./GeneralFair/GeneralFair";
import { GeneralTour } from "./GeneralTour/GeneralTour";
import { TwoBlock } from "./TwoBlock/TwoBlock";

type Props = {
    page: VideoPageType;
    fair: FairInterface | null;
    address: AddressType | null;
    generalTour: ContentBlock | null;
};

export const ClientHomePage = ({ page, fair, address, generalTour }: Props) => {
    const { setNeedFillHeaderWithFixed, setFixedHeader, isMobile } =
        useAppContext();
    useEffect(() => {
        setFixedHeader(false);
        setNeedFillHeaderWithFixed(false);
    }, []);

    return (
        <>
            {/* <div style={{ display: "none" }}> */}
            <ControlScrollSection id="block-1" transform={true}>
                <BlockWithButtonAndContent
                    button={{
                        button: <Glasses />,
                        indexBlockToScroll: 1,
                    }}
                >
                    <FirstBlock />
                </BlockWithButtonAndContent>
            </ControlScrollSection>

            <ControlScrollSection id="block-2" fillBg={true}>
                <BlockWithButtonAndContent
                    button={{
                        button: <Glasses />,
                        indexBlockToScroll: 2,
                    }}
                >
                    <VideoFullBlock
                        src={getVideoSrc(page, isMobile)}
                        id="block-2"
                    >
                        <TwoBlock />
                    </VideoFullBlock>
                </BlockWithButtonAndContent>
            </ControlScrollSection>

            <UnControlScrollSection id="block-3">
                <GeneralFair fair={fair} />
            </UnControlScrollSection>
            <HrBlocks />

            <UnControlScrollSection
                id="block-4"
                style={{ paddingTop: "0px", minHeight: "0px" }}
            >
                <GeneralAddress address={address} />
            </UnControlScrollSection>
            <HrBlocks />
            {/* </div> */}
            <UnControlScrollSection id="block-5" style={{ paddingTop: "0px" }}>
                <GeneralTour generalTour={generalTour} />
            </UnControlScrollSection>
            <HrBlocks />
            <UnControlScrollSection
                id="block-6"
                style={{
                    paddingTop: "0px",
                    minHeight: "0px",
                    marginBottom: "80px",
                }}
            >
                <TitleSection title="Контакты" />
                <Contacts />
                <div className="flex justify-center lg:justify-start">
                    <ButtonWithSvg
                        title="К странице контактов"
                        subtitle="Перейти"
                        icon={
                            <PhoneIcon style={{ transform: "rotate(15deg)" }} />
                        }
                        href="/contacts"
                    />
                </div>
            </UnControlScrollSection>
        </>
    );
};
