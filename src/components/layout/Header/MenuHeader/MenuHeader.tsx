"use client";
import { useAppContext } from "@/app/context/AppContext";
import { Contacts } from "@/components/Contacts/Contacts";
import { headerStore } from "@/stores/HeaderStore";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./MenuHeader.module.css";

export const MenuHeader = observer(() => {
    const { isMobile, collection } = useAppContext();
    const header = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (header.current) {
            document.documentElement.style.setProperty(
                "--is-menu-width",
                `${header.current.clientWidth}px`,
            );
        }
    }, [isMobile, header.current]);

    return (
        <div
            ref={header}
            className={clsx(styles.menu, headerStore.openHeader && styles.open)}
        >
            <div className={"scroll-wrapper"}>
                <div className={styles.content}>
                    <div className={styles.links}>
                        <Link
                            className={clsx(styles.link, "link-font")}
                            href="/"
                        >
                            Главная
                        </Link>
                        <Link
                            className={clsx(styles.link, "link-font")}
                            href={
                                "/collection" +
                                (collection === 1 ? `/${collection}` : "")
                            }
                        >
                            <h3>Винная колелкция</h3>
                        </Link>
                        <Link
                            className={clsx(styles.link, "link-font")}
                            href="/fairs"
                        >
                            События
                        </Link>
                        <Link
                            className={clsx(styles.link, "link-font")}
                            href="/tours"
                        >
                            Туризм
                        </Link>
                        <Link
                            className={clsx(styles.link, "link-font")}
                            href="/addresses"
                        >
                            Адреса магазинов
                        </Link>
                    </div>
                    <div className={styles.contacts}>
                        <p></p>
                        <Contacts />
                    </div>
                </div>
            </div>
        </div>
    );
});
