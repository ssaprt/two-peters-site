import { BreadCrumbsStorage } from "@/stores/BreadCrumbsStorage";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import styles from "./BreadCrumbs.module.css";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    breadCrumbs: BreadCrumbsStorage;
    children: React.ReactNode;
}

export const ButtonPage = observer(
    ({ breadCrumbs, children, ...props }: Props) => {
        const {
            currentPage,
            pendingPage,
            startNavigateTo,
            setPosition,
            setSize,
            startAnim,
        } = breadCrumbs;

        const button = useRef<HTMLButtonElement>(null);
        const pageNumber = String(children);

        // активна либо текущая страница, либо та, к которой анимируемся
        const isActive = (pendingPage ?? currentPage) === pageNumber;

        const handleClick = () => {
            if (isActive || startAnim) return;

            if (button.current) {
                const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
                    button.current;
                setPosition(offsetLeft, offsetTop);
                setSize(offsetWidth, offsetHeight);
            }

            startNavigateTo(pageNumber);
        };

        useEffect(() => {
            if (!button.current || !isActive) return;

            const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
                button.current;
            setPosition(offsetLeft, offsetTop);
            setSize(offsetWidth, offsetHeight);
        }, [currentPage, isActive, button.current?.offsetLeft]);

        return (
            <button
                {...props}
                onClick={handleClick}
                ref={button}
                disabled={isActive || startAnim}
                className={`${styles.page} ${isActive ? styles.active : ""}`}
            >
                {children}
            </button>
        );
    },
);
