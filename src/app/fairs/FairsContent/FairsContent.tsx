import FairsIcon from "@/assets/icons/common/fairs.svg";
import { ButtonWithSvg } from "@/components/button/buttonWithSvg/buttonWithSvg";
import { NotFound } from "@/components/emptyPlaceholders/NotFound/NotFound";
import { FairContainer } from "@/components/Fair/FairContainer";
import { HrBlocks } from "@/components/hr/HrBlocks/HrBlocks";
import { DefaultLoader } from "@/components/loaders/DefaultLoader/DefaultLoader";
import { FairInterface, getFairsRange } from "@/lib/api/Fairs";

import { scrollManager } from "@/stores/ScrollManager";
import React, { useEffect, useState } from "react";

export const FairsContent = ({
    initialFairs,
}: {
    initialFairs: {
        fairs: FairInterface[] | null;
        total: number;
    };
}) => {
    if (!initialFairs.fairs)
        return <NotFound title="События не доступны" icon={<FairsIcon />} />;

    const [fairs, setFairs] = useState<FairInterface[]>(initialFairs.fairs);
    const [response, setResponse] = useState<{ fairs: FairInterface[] }>({
        fairs: [],
    });
    const [loading, setLoading] = useState(false);
    const [readyUnmount, setReadyUnmount] = useState(false);
    const [indexAfterLoad, setIndexAfterLoad] = useState(
        initialFairs.fairs.length,
    );
    const overlayRef = React.useRef(null);

    const loadMore = async () => {
        if (loading) return;

        setLoading(true);
        const response = await getFairsRange(fairs.length, 5);
        setResponse(response!);
    };

    useEffect(() => {
        if (!readyUnmount) return;

        setFairs((prev) => [...prev, ...response.fairs]);

        setLoading(false);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const fairToMove = (
                    overlayRef.current! as HTMLElement
                ).querySelector(`#block-${indexAfterLoad + 1}`) as HTMLElement;

                scrollManager.scrollToPosition(fairToMove, -100, 1);

                setIndexAfterLoad((prev) => prev + response.fairs.length);

                setReadyUnmount(false);
            });
        });
    }, [readyUnmount]);

    return (
        <div ref={overlayRef}>
            {fairs.map((fair, i) => (
                <div key={fair.id} id={`block-${i + 1}`}>
                    <FairContainer fair={fair} />
                    {i !== fairs.length - 1 && <HrBlocks />}
                </div>
            ))}
            {loading && !readyUnmount && (
                <div className="flex justify-center">
                    <div className="relative my-[10px] size-[68px]">
                        <DefaultLoader
                            elementIsReady={loading}
                            callBackEndAnimation={() => setReadyUnmount(true)}
                        />
                    </div>
                </div>
            )}
            {fairs.length < initialFairs.total && !loading && (
                <div className="flex justify-center">
                    <ButtonWithSvg
                        onClick={() => loadMore()}
                        icon={<FairsIcon />}
                        title="Загрузить больше событий"
                        subtitle="Начать загрузку"
                    />
                </div>
            )}
            <div className="h-[100px]"></div>
        </div>
    );
};
