import { useAppContext } from "@/app/context/AppContext";
import ArrowBreadCrumbsIcon from "@/assets/icons/common/arrow-breadcrumbs.svg";
import { BreadCrumbsStorage } from "@/stores/BreadCrumbsStorage";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import styles from "./BreadCrumbs.module.css";
import { ButtonPage } from "./ButtonPage";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    breadCrumbs: BreadCrumbsStorage;
}

export const BreadCrumbs = observer(({ breadCrumbs, ...props }: Props) => {
    const { isMobile } = useAppContext();
    const {
        getTotalPages,
        currentPageNumber,
        positionTrack,
        sizeTrack,
        startAnim,
        positionShadow,
        differentPageForAnim,
        hasPrevPage,
        hasNextPage,
        startNavigateTo,
        commitPendingPage,
    } = breadCrumbs;

    const trackRef = useRef<HTMLDivElement>(null);

    if (getTotalPages < 2) return null;

    function endAnimation(e: React.AnimationEvent) {
        if (e.animationName.includes("next")) {
            commitPendingPage();
        }
    }

    const styleShadow = `${positionShadow === "to_left" ? "5px" : "-5px"}`;

    const handlePrevPage = () => {
        if (hasPrevPage && !startAnim) {
            startNavigateTo(String(currentPageNumber - 1));
        }
    };

    const handleNextPage = () => {
        if (hasNextPage && !startAnim) {
            startNavigateTo(String(currentPageNumber + 1));
        }
    };

    const getPagesWithEllipsis = () => {
        const total = getTotalPages;
        const current = currentPageNumber;

        const siblingCount = isMobile ? 1 : 2;
        const maxVisible = isMobile ? 6 : 9;

        const pages: (number | "...")[] = [];

        if (total <= maxVisible) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        const leftSibling = Math.max(current - siblingCount, 2);
        const rightSibling = Math.min(current + siblingCount, total - 1);

        pages.push(1);

        if (leftSibling > 2) {
            pages.push("...");
        }

        for (let i = leftSibling; i <= rightSibling; i++) {
            pages.push(i);
        }

        if (rightSibling < total - 1) {
            pages.push("...");
        }

        pages.push(total);

        return pages;
    };

    return (
        <div
            className={styles.BreadCrumbs}
            {...props}
            style={
                {
                    pointerEvents: startAnim ? "none" : "auto",
                    "--shadow": styleShadow,
                    "--time_animation": differentPageForAnim,
                } as React.CSSProperties
            }
        >
            <div
                className={`${styles.breadCrumbsArrow} ${styles.back} ${hasPrevPage ? "" : styles.disabled} ${
                    startAnim ? styles.arrowPulse : ""
                }`}
                onClick={handlePrevPage}
            >
                <ArrowBreadCrumbsIcon />
            </div>

            <div className={styles.breadCrumbsPuzzles}>
                {getPagesWithEllipsis().map((page, index) =>
                    page === "..." ? (
                        <span
                            key={`ellipsis-${index}`}
                            className={styles.ellipsis}
                        >
                            ...
                        </span>
                    ) : (
                        <ButtonPage breadCrumbs={breadCrumbs} key={page}>
                            {page}
                        </ButtonPage>
                    ),
                )}

                <div
                    ref={trackRef}
                    onAnimationEnd={endAnimation}
                    className={`${styles.track} ${startAnim ? styles.next : ""}`}
                    style={{
                        ...positionTrack,
                        ...sizeTrack,
                        display: Object.keys(positionTrack).length
                            ? "block"
                            : "none",
                    }}
                ></div>
            </div>

            <div
                className={`${styles.breadCrumbsArrow} ${styles.forward} ${hasNextPage ? "" : styles.disabled} ${
                    startAnim ? styles.arrowPulse : ""
                }`}
                onClick={handleNextPage}
            >
                <ArrowBreadCrumbsIcon />
            </div>
        </div>
    );
});
