import BackIcon from "@/assets/icons/common/back.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./LinkBack.module.css";

export const LinkBack = ({ title }: { title?: string }) => {
    const header = useRef<HTMLDivElement>(null);
    useEffect(() => {
        header.current = document.getElementById("header") as HTMLDivElement;
    }, []);
    const router = useRouter();

    if (header.current === null) return null;
    return createPortal(
        <Link
            onClick={(e) => {
                e.preventDefault();
                router.back();
            }}
            href="#"
            className={styles.back}
        >
            <BackIcon />
            <span className="link-font">{title || "Назад"}</span>
        </Link>,
        header.current!,
    );
};
