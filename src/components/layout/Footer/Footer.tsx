import { useAppContext } from "@/app/context/AppContext";
import Logo from "@/assets/icons/logo/two-peters-name.svg";
import Link from "next/link";
import styles from "./Footer.module.css";

export const Footer = () => {
    const { collection } = useAppContext();
    return (
        <div className={styles.footer} id="footer">
            <div className={styles.pallet}></div>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.content}>
                <div className={styles.links}>
                    <Link href="/" className={styles.link}>
                        Главная
                    </Link>
                    <Link
                        href={
                            "/collection" +
                            (collection === 1 ? `/${collection}` : "")
                        }
                        className={styles.link}
                    >
                        Винная коллекция
                    </Link>
                    <Link href="/fairs" className={styles.link}>
                        События
                    </Link>
                    <Link href="/tours" className={styles.link}>
                        Туризм
                    </Link>
                    <Link href="/addresses" className={styles.link}>
                        Адреса
                    </Link>
                    <Link href="/contacts" className={styles.link}>
                        Контакты
                    </Link>
                </div>
            </div>
        </div>
    );
};
