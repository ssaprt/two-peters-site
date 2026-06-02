import { useMounted } from "@/hooks/Utils/useMounted";
import { Award } from "@/lib/api/Products";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import styles from "./Awards.module.css";

export const ButtonAction = ({ awards }: { awards: Award[] }) => {
    const refButton = useRef<HTMLDivElement>(null);
    const refCoins = useRef<HTMLDivElement>(null);
    const mounted = useMounted();

    useEffect(() => {
        const button = refButton.current;
        if (!button) return;
        let intervalId: ReturnType<typeof setInterval> | null = null;

        function starsRain() {
            const coins = refCoins.current;
            if (!coins) return;
            coins.classList.add(styles.show);

            coins.innerHTML = "";
            if (intervalId) clearInterval(intervalId);

            const w = button!.clientWidth;
            const h = button!.clientHeight + 15;
            const stars: Record<string, any>[] = [];

            for (let i = 0; i < 8; i++) {
                const star = document.createElement("div");
                star.className = styles.coin;
                star.style.position = "absolute";
                const size = randFly(10, 30);
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.borderRadius = "50%";
                star.style.left = `${randFly(0, w - size)}px`;
                star.style.top = `${randFly(0, h - size)}px`;
                coins.appendChild(star);
                stars.push({
                    element: star,
                    velocityX: randFly(-1, 1) || 1,
                    velocityY: randFly(1, 3),
                    size,
                });
            }

            intervalId = setInterval(() => {
                stars.forEach((star) => {
                    const el = star.element;
                    let newLeft = parseFloat(el.style.left) + star.velocityX;
                    let newTop = parseFloat(el.style.top) + star.velocityY;

                    if (newLeft < 0 || newLeft > w - star.size) {
                        star.velocityX *= -1;
                    } else {
                        el.style.left = `${newLeft}px`;
                    }

                    if (newTop < 0 || newTop > h - star.size) {
                        star.velocityY *= -1;
                    } else {
                        el.style.top = `${newTop}px`;
                    }
                });
            }, 80);
        }

        function starsStop() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            if (refCoins.current) {
                refCoins.current.innerHTML = "";
                refCoins.current.classList.remove(styles.show);
            }
        }

        function randFly(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        button.addEventListener("mouseover", starsRain);
        button.addEventListener("mouseleave", starsStop);

        return () => {
            button.removeEventListener("mouseover", starsRain);
            button.removeEventListener("mouseleave", starsStop);
            if (intervalId) clearInterval(intervalId);
        };
    }, [awards, mounted]);

    return (
        <div ref={refButton} className={clsx(styles.button, "roboto-font")}>
            Награды → <div ref={refCoins} className={styles.coins}></div>
        </div>
    );
};
