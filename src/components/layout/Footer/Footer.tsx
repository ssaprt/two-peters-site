import { useAppContext } from "@/app/context/AppContext";
import Logo from "@/assets/icons/logo/two-peters-name.svg";
import { useOperationModal } from "@/hooks/useOperationModal/useOperationModal";
import { FullOverlayModalsControl } from "@/stores/FullOverlayModalsControl";
import { WaitingUtils } from "@/stores/WaitingUtils";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";
import { Popup } from "./Popup/Popup";

export const Footer = () => {
    const { collection, isMobile } = useAppContext();
    const [type, setType] = useState<"confidentiality" | "cookie">(
        "confidentiality",
    );
    const router = useRouter();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const modalData = useRef(new FullOverlayModalsControl()).current;
    const utilsData = useRef(new WaitingUtils()).current;
    const data = useOperationModal(utilsData, modalData);

    const handleClick = (e: React.MouseEvent, href: string) => {
        if (isMobile) return;
        e.preventDefault();
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            router.push(href);
        }, 230);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <div className={styles.footer} id="footer">
            <div className={styles.pallet}></div>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.content}>
                <div className={styles.links}>
                    <Link
                        href="/"
                        onClick={(e) => handleClick(e, "/")}
                        className={styles.link}
                    >
                        Главная
                    </Link>
                    <Link
                        href={
                            "/collection" +
                            (collection === 1 ? `/${collection}` : "")
                        }
                        onClick={(e) =>
                            handleClick(
                                e,
                                "/collection" +
                                    (collection === 1 ? `/${collection}` : ""),
                            )
                        }
                        className={styles.link}
                    >
                        Винная коллекция
                    </Link>
                    <Link
                        href="/fairs"
                        onClick={(e) => handleClick(e, "/fairs")}
                        className={styles.link}
                    >
                        События
                    </Link>
                    <Link
                        href="/tours"
                        onClick={(e) => handleClick(e, "/tours")}
                        className={styles.link}
                    >
                        Туризм
                    </Link>
                    <Link
                        href="/addresses"
                        onClick={(e) => handleClick(e, "/addresses")}
                        className={styles.link}
                    >
                        Адреса
                    </Link>
                    <Link
                        href="/contacts"
                        onClick={(e) => handleClick(e, "/contacts")}
                        className={styles.link}
                    >
                        Контакты
                    </Link>
                </div>
                <div className={styles.additionalInfo}>
                    <span
                        onClick={() => {
                            setType("cookie");
                            data.modalData.isOpen();
                        }}
                        className={clsx(styles.linkAdditional, "link-font")}
                    >
                        Файлы cookies
                    </span>
                    <span
                        onClick={() => {
                            setType("confidentiality");
                            data.modalData.isOpen();
                        }}
                        className={clsx(styles.linkAdditional, "link-font")}
                    >
                        Политика конфиденциальности
                    </span>
                </div>
            </div>
            <Popup
                type={type}
                modalData={data.modalData}
                utilsData={data.utilsData}
            />
        </div>
    );
};
