import IconSertificat from "@/assets/icons/product/certificate.svg";
import { ProductInterface } from "@/lib/api/Products";
import styles from "./ProductTop.module.css";

export const Sertificate = ({
    product,
    style = {},
}: {
    product: ProductInterface;
    style?: React.CSSProperties;
}) => {
    return (
        <a
            style={style}
            className={styles.isSertificate}
            target="_blank"
            href={`/uploads/sertificates/${product.id}/${product.sertificat}`}
        >
            <IconSertificat />
            <span>Скачать сертификат</span>
        </a>
    );
};
