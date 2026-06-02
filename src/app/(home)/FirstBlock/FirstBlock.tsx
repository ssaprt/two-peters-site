"use client";
import { useAppContext } from "@/app/context/AppContext";
import { layoutStore } from "@/stores/LayoutStore";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useEffect } from "react";
import styles from "./FirstBlock.module.css";

export const FirstBlock = observer(() => {
    const { isMobile } = useAppContext();

    useEffect(() => {
        layoutStore.addLoadElement("left-bro-1");
        layoutStore.addLoadElement("general-img");
        layoutStore.addLoadElement("right-bro-2");
    }, []);

    return (
        <>
            <Image
                className={clsx(styles.bro, styles.left)}
                src={"/left-bro-1.webp"}
                alt={"Два Петра Крымские Вина"}
                width={1000}
                height={1000}
                priority
                onLoad={() => layoutStore.setLoadElement("left-bro-1")}
            />

            <Image
                className={styles.general}
                src={isMobile ? "/general-mobile.png" : "/general.png"}
                alt={"Пётр Щука Два Петра"}
                width={1000}
                height={1000}
                priority
                onLoad={() => layoutStore.setLoadElement("general-img")}
            />

            <Image
                className={clsx(styles.bro, styles.right)}
                src={"/right-bro-2.webp"}
                alt={"Пётр Два Петра"}
                width={1000}
                height={1000}
                priority
                onLoad={() => layoutStore.setLoadElement("right-bro-2")}
            />
        </>
    );
});
