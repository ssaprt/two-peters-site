//* IMPORTS -----------------------------------------------------------------------------*
import { useAppContext } from "@/app/context/AppContext";
import { useInfoScroll } from "@/hooks/Scrollbar/useInfoScroll";
import { headerStore } from "@/stores/HeaderStore";
import { sectionVisibilityStore } from "@/stores/SectionVisibilityStore";
import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ButtonHeaderMenu } from "./ButtonHeaderMenu/ButtonHeaderMenu";
import styles from "./Header.module.css";
import { Logo } from "./Logo/Logo";
import { MenuHeader } from "./MenuHeader/MenuHeader";
//* IMPORTS -----------------------------------------------------------------------------*

export const Header = observer(() => {
    //* STATES ***************************************************************************
    //? получаем информацию о прогрессе прокрутки + хук монтирвоания
    const { getProgressForAnim, mounted } = useInfoScroll();
    const pathname = usePathname();

    //? Версия для пк\мобильного isMobile - true
    //? получаем информации о состоянии фиксированного хедера
    //? получаем информацию, нужно ли закрашивать бг хедера если он фиксирован
    const { isMobile, needFillHeaderWithFixed, fixedHeader } = useAppContext();

    //? получаем информацию о секции, которая отвечает за анимацию хеадер элементов
    const getTransformSection = sectionVisibilityStore.getTransformSection();
    const getFillBgSection = sectionVisibilityStore.getFillBgSection();

    //? headerRef
    const headerRef = useRef<HTMLDivElement>(null);

    //* STATES ***************************************************************************

    //* EFFECTS **************************************************************************

    useEffect(() => {
        if (headerStore.openHeader === true) {
            headerStore.toggleOpen();
        }
    }, [pathname]);

    //! когда фиксированный хедер
    useEffect(() => {
        if (!fixedHeader || !mounted) return;
        headerRef.current!.style.setProperty("--y-header", `20px`);
        headerRef.current!.style.setProperty("--h-header", `60px`);
        headerRef.current!.style.setProperty("--pointer-events", `all`);
        headerRef.current!.style.setProperty("--opacity", `0`);
        headerRef.current!.style.setProperty(
            "--currentColor",
            "rgba(255,255,255,.85)",
        );
        headerRef.current!.style.setProperty(
            "--bg-header",
            needFillHeaderWithFixed ? "var(--global-bg-color)" : "transparent",
        );

        headerRef.current!.style.setProperty(
            "--shadow-header",
            needFillHeaderWithFixed ? "rgba(0, 0, 0, .3)" : "transparent",
        );
    }, [needFillHeaderWithFixed, fixedHeader, pathname]);

    useEffect(() => {
        if (fixedHeader || !mounted) return;
        const summ = 20;
        const res = getProgressForAnim({
            start: isMobile ? 40 : 0,
            howMatchForAnim: summ,
        });

        const y = res === summ ? 0 : summ - res;

        headerRef.current!.style.setProperty("--y-header", `${y}px`);

        const hHeader = getProgressForAnim({
            howMatchForAnim: 100,
            start: isMobile ? 40 : 0,
        });

        headerRef.current!.style.setProperty("--h-header", `${hHeader}px`);

        const opacity = getProgressForAnim({
            howMatchForAnim: 1,
            start: isMobile ? 40 : 0,
            end: document.documentElement.clientHeight * 0.7,
        });

        headerRef.current!.style.setProperty(
            "--pointer-events",
            `${opacity !== 1 ? "all" : "none"}`,
        );

        headerRef.current!.style.setProperty("--opacity", `${opacity}`);

        const currentColor = getProgressForAnim({
            howMatchForAnim: 1,
            start: isMobile
                ? document.documentElement.clientHeight * 0.7
                : document.documentElement.clientHeight * 0.9,
            end: isMobile
                ? document.documentElement.clientHeight * 0.78
                : document.documentElement.clientHeight * 0.98,
        });

        const currentColorFlag =
            getTransformSection && getTransformSection.progress < 0.15;

        const shouldUseColor = currentColor < 0.001 || currentColorFlag;

        const needDarkBg =
            getFillBgSection?.visible === false &&
            getFillBgSection.progress < 0.01 &&
            res < 10;

        const textColor = needDarkBg
            ? "var(--global-color-link)"
            : !shouldUseColor
              ? "rgba(255,255,255,.85)"
              : "rgba(255,255,255,.85)";

        headerRef.current!.style.setProperty("--currentColor", textColor);

        headerRef.current?.style.setProperty(
            "transition",
            needDarkBg
                ? "color .2s linear, background .2s linear, box-shadow .2s linear"
                : "color .1s linear, background .1s linear, box-shadow .07s linear",
        );

        headerRef.current!.style.setProperty(
            "--bg-header",
            needDarkBg ? "var(--global-bg-color)" : "transparent",
        );
        headerRef.current!.style.setProperty(
            "--shadow-header",
            needDarkBg ? "rgba(0, 0, 0, .3)" : "transparent",
        );
    }, [
        fixedHeader,
        mounted,
        getProgressForAnim,
        isMobile,
        getFillBgSection,
        pathname,
        getTransformSection,
    ]);
    //* EFFECTS **************************************************************************

    //* JSX ******************************************************************************
    return (
        <div id="header" className={styles.header} ref={headerRef}>
            <MenuHeader />
            <ButtonHeaderMenu />
            <Logo />
        </div>
    );
    //* JSX ******************************************************************************
});
