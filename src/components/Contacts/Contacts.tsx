import IconTourism from "@/assets/icons/common/two_tickets.svg";
import IconMail from "@/assets/icons/contacts/mail.svg";
import IconPhone from "@/assets/icons/contacts/old-phone.svg";
import IconTg from "@/assets/icons/contacts/tg.svg";
import styles from "./Contacts.module.css";

export const Contacts = () => {
    return (
        <div className={styles.overlay}>
            <a
                href="https://t.me/TWOPETERS"
                target="_blank"
                className={styles.link}
            >
                <IconTg />
                <span className="text-[12px] md:text-[12px] lg:text-[14px] link-font">
                    Телеграм
                </span>
            </a>
            <a href="tel:+79788660095" className={styles.link}>
                <IconTourism />
                <span className="text-[12px] md:text-[12px] lg:text-[14px] link-font">
                    Туризм +79788660095
                </span>
            </a>
            <a href="tel:+79788966188" className={styles.link}>
                <IconPhone />
                <span className="text-[12px] md:text-[12px] lg:text-[14px] link-font">
                    Справка: +79788966188
                </span>
            </a>
            <a href="mailto: spdolinavin@mail.ru" className={styles.link}>
                <IconMail />
                <span className="text-[12px] md:text-[12px] lg:text-[14px] link-font">
                    Написать: spdolinavin@mail.ru
                </span>
            </a>
        </div>
    );
};
