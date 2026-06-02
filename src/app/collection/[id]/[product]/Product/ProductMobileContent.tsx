import { Awards } from "@/components/Product/Awards/Awards";
import { CanBuy } from "@/components/Product/CanBuy";
import { useMounted } from "@/hooks/Utils/useMounted";
import { ProductInterface } from "@/lib/api/Products";
import { useRef } from "react";
import { DescriptionProduct } from "./DescriptionProduct";
import { NameProduct } from "./NameProduct";
import styles from "./ProductTop.module.css";
import { Sertificate } from "./Sertificate";

export const ProductMobileContent = ({
    product,
}: {
    product: ProductInterface;
}) => {
    const mobileRef = useRef<HTMLDivElement>(null);
    const mounted = useMounted();

    return (
        <div ref={mobileRef} className={styles.mobile}>
            <NameProduct
                title={product.name_wine}
                to={mobileRef.current as HTMLElement}
            />
            <DescriptionProduct
                description={product.description}
                to={mobileRef.current as HTMLElement}
            />
            {mounted && <Awards product={product} />}
            {mounted && (
                <CanBuy
                    style={{
                        margin: "20px auto",
                    }}
                    styleCanBuy={{
                        justifyContent: "space-between",
                        width: "90%",
                        marginTop: "40px",
                        alignContent: "center",
                        border: "var(--global-neutral-color) 2px outset",
                        padding: "12px",
                        paddingRight: "20px",
                        borderRadius: "60px",
                    }}
                    product={product}
                />
            )}
            {mounted && (
                <Sertificate
                    style={{
                        justifyContent: "center",
                        margin: "20px auto",
                        alignContent: "center",
                    }}
                    product={product}
                />
            )}
        </div>
    );
};
