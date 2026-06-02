import { useAppContext } from "@/app/context/AppContext";
import { useAnimationBuyBottle } from "@/hooks/basket/useAnimationBuyBottle";
import { ProductInterface } from "@/lib/api/Products";
import clsx from "clsx";
import styles from "./Product.module.css";

export const CanBuy = ({
    product,
    style = {},
    styleCanBuy = {},
}: {
    product: ProductInterface;
    style?: React.CSSProperties;
    styleCanBuy?: React.CSSProperties;
}) => {
    const animateBasket = useAnimationBuyBottle();
    const { isMobile } = useAppContext();
    const canBuy = product.buy === 1 && product.price !== 0;
    const stylez =
        style && canBuy ? { ...style, ...styleCanBuy } : { ...style };

    const handleBuy = (e: React.MouseEvent<HTMLElement>) => {
        animateBasket(e);
        // остальная логика добавления в корзину
    };
    return (
        <div className={styles.aBuy} style={{ ...stylez }}>
            {canBuy ? (
                <>
                    <button className={styles.sale} onClick={handleBuy}>
                        <svg
                            className={styles.circle}
                            viewBox="0 0 160 160"
                            overflow="visible"
                        >
                            <defs>
                                <path
                                    id={`circle-${product.id}`}
                                    d="M 80,80 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                                />
                            </defs>
                            <text dy="-30">
                                <textPath
                                    href={`#circle-${product.id}`}
                                    startOffset={isMobile ? "38%" : "20%"}
                                >
                                    КУПИТЬ
                                </textPath>
                            </text>
                        </svg>
                    </button>
                    <div className={styles.priceOverlay}>
                        <span className={clsx(styles.price, "lemon-font")}>
                            {product.price}
                        </span>
                        <span className={clsx(styles.mass, "lemon-font")}>
                            {product.mass} ml
                        </span>
                    </div>
                </>
            ) : (
                <a
                    href="tel:+79788966188"
                    className={clsx(styles.left, "lemon-font")}
                >
                    <span className={styles.on}>Уточнить наличие</span>
                    <span>+79788966188</span>
                </a>
            )}
        </div>
    );
};
