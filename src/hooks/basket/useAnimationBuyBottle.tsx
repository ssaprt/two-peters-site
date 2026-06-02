"use client";

import { useAppContext } from "@/app/context/AppContext";
import { useCallback } from "react";

function spawnBottle(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
) {
    const bottle = document.createElement("div");
    bottle.className = "is-bottle";
    bottle.style.cssText = `
        position: fixed;
        left: ${startX - 14}px;
        top: ${startY - 28}px;
        transform: scale(.8) rotate(-22deg);
        transition: none;
    `;
    document.body.appendChild(bottle);

    setTimeout(() => {
        // этап 1 — едет к корзине и поднимается
        bottle.style.left = `${endX + 60}px`;
        bottle.style.top = `${endY - endY / 2}px`;
        bottle.style.transform = "scale(.85) translateY(0px) rotate(0deg)";
        bottle.style.transition = ".7s ease-in-out";

        setTimeout(() => {
            // этап 2 — возвращается на старт и исчезает
            bottle.style.transform = "scale(.85) translateY(0px) rotate(0deg)";
            bottle.style.left = `${endX + endX / 2.5}px`;
            bottle.style.top = `${endY - endY / 2}px`;
            bottle.style.opacity = "0";
            bottle.style.transition = ".8s ease-in-out";

            setTimeout(() => bottle.remove(), 800);
        }, 650);
    }, 30);
}

export function useAnimationBuyBottle() {
    const { isMobile } = useAppContext();

    return useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            const menuButton = document.querySelector("#header-button");
            if (!menuButton) return;

            const clickRect = e.currentTarget.getBoundingClientRect();
            const menuRect = menuButton.getBoundingClientRect();

            const startX = clickRect.left + clickRect.width / 2;
            const startY = clickRect.top + clickRect.height / 2;
            const endX = menuRect.left + menuRect.width / 2;
            const endY = menuRect.top + menuRect.height / 2;

            spawnBottle(startX, startY, endX, endY);
        },
        [isMobile],
    );
}
