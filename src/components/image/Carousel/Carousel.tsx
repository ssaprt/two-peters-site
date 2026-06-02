"use client";

import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef } from "react";

import styles from "./Carousel.module.css";
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { ImageElement } from "./ImageElement";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number) =>
    Math.min(Math.max(number, min), max);

const EmblaCarousel = ({
    slides,
    options = {},
}: {
    slides: string[];
    options: Record<string, unknown>;
}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);
    const viewportRef = useRef<HTMLDivElement>(null);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef<HTMLElement[]>([]);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const setTweenNodes = useCallback((emblaApi: any) => {
        tweenNodes.current = emblaApi
            .slideNodes()
            .map((slideNode: HTMLElement) => {
                return slideNode.querySelector(`.${styles.embla__slide__img}`);
            });
    }, []);

    const setTweenFactor = useCallback((emblaApi: any) => {
        tweenFactor.current =
            TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    }, []);

    const tweenScale = useCallback((emblaApi: any, event?: any) => {
        const engine = emblaApi.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const slidesInView = emblaApi.slidesInView();
        const isScrollEvent = event?.type === "scroll";

        emblaApi
            .scrollSnapList()
            .forEach((scrollSnap: number, snapIndex: number) => {
                let diffToTarget = scrollSnap - scrollProgress;
                const slidesInSnap = engine.slideRegistry[snapIndex];

                slidesInSnap.forEach((slideIndex: number) => {
                    if (isScrollEvent && !slidesInView.includes(slideIndex))
                        return;

                    if (engine.options.loop) {
                        engine.slideLooper.loopPoints.forEach(
                            (loopItem: any) => {
                                const target = loopItem.target();
                                if (
                                    slideIndex === loopItem.index &&
                                    target !== 0
                                ) {
                                    const sign = Math.sign(target);
                                    if (sign === -1)
                                        diffToTarget =
                                            scrollSnap - (1 + scrollProgress);
                                    if (sign === 1)
                                        diffToTarget =
                                            scrollSnap + (1 - scrollProgress);
                                }
                            },
                        );
                    }

                    const tweenValue =
                        1 - Math.abs(diffToTarget * tweenFactor.current);
                    const scale = numberWithinRange(
                        tweenValue,
                        0,
                        1,
                    ).toString();
                    const tweenNode = tweenNodes.current[slideIndex];
                    if (tweenNode)
                        tweenNode.style.transform = `scale(${scale})`;
                });
            });
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenScale(emblaApi);

        emblaApi
            .on("reInit", setTweenNodes)
            .on("reInit", setTweenFactor)
            .on("reInit", tweenScale)
            .on("scroll", tweenScale)
            .on("slideFocus", tweenScale);
    }, [emblaApi, tweenScale]);

    useEffect(() => {
        const el = viewportRef.current;
        if (!el) return;

        let startX = 0;
        let startY = 0;

        const onTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
            const dx = Math.abs(e.touches[0].clientX - startX);
            const dy = Math.abs(e.touches[0].clientY - startY);

            if (dx > dy) {
                e.stopPropagation();
            }
        };

        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: true });

        return () => {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchmove", onTouchMove);
        };
    }, []);

    return (
        <div className={styles.embla}>
            <div
                className={styles.embla__viewport}
                ref={(node) => {
                    (viewportRef as any).current = node;
                    emblaRef(node);
                }}
            >
                <div className={styles.embla__container}>
                    {slides.map((img, index) => (
                        <div className={styles.embla__slide} key={index}>
                            <ImageElement img={img} />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.embla__controls}>
                <div className={styles.embla__buttons}>
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>

                <div className={styles.embla__dots}>
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={styles.embla__dot.concat(
                                index === selectedIndex
                                    ? ` ${styles["embla__dot--selected"]}`
                                    : "",
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
