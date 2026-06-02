import { observer } from "mobx-react-lite";
import Link from "next/link";
import styles from "./Logo.module.css";
import { TwoPetersCircle } from "./TwoPetersCircle";
import { TwoPetersName } from "./TwoPetersName";

export const Logo = observer(() => {
    return (
        <Link href="/" className={styles.logo}>
            <TwoPetersCircle />
            {/* 
        <TwoPetersSubTitle /> */}
            <TwoPetersName />
        </Link>
    );
});
