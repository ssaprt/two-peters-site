import { useAppContext } from "@/app/context/AppContext";

import { useMounted } from "@/hooks/Utils/useMounted";
import { CategoryInterface } from "@/lib/api/Collection";
import {
    getAwardSrc,
    getProductSrc,
    getSubstrateProduct,
    ProductInterface,
} from "@/lib/api/Products";

import { layoutStore } from "@/stores/LayoutStore";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DefaultObserveImage } from "../image/DefaultObserveImage/DefaultObserveImage";
import { CanBuy } from "./CanBuy";
import styles from "./Product.module.css";

type Props = {
    category: CategoryInterface;
    product: ProductInterface;
    index?: number;
};

export const Product = ({ category, product, index }: Props) => {
    const refOverlay = useRef<HTMLDivElement>(null);
    const refProd = useRef<HTMLDivElement>(null);
    const { isMobile } = useAppContext();
    const mounted = useMounted();
    const [h, setH] = useState(0);

    const toggle = () => {
        refProd.current?.classList.add(styles.active);
    };

    useEffect(() => {
        if (!mounted) return;
        if (refOverlay.current) {
            setH(
                isMobile
                    ? (refOverlay.current.parentNode as HTMLDivElement)
                          .offsetWidth - 20
                    : refOverlay.current.offsetHeight * 0.96,
            );
        }
    }, [refOverlay.current, mounted]);

    useEffect(() => {
        if (!mounted) return;
        if (!index) return;

        layoutStore.addLoadElement(`product${index}`);
    }, [index]);

    if (!mounted) return null;

    return (
        <div className={styles.wrapper} ref={refOverlay}>
            <Link
                href={`/collection/${category.id}/${product.name_wine}`}
                className={styles.product}
            >
                <div className={styles.isProductImage} ref={refProd}>
                    <DefaultObserveImage
                        fixedHeight={h}
                        image={{
                            preview: false,
                            backSetLoad: () => {
                                toggle();
                            },
                            backSetOnLoad: () => {
                                layoutStore.setLoadElement(`product${index}`);
                            },
                            priority: [0, 1, 2, 3].includes(index || 0),
                        }}
                        src_image={getProductSrc(product)}
                        alt={`${product.name_wine} - вино винодельни two-peters.ru. То самое вино, которые выделяют сомелье за его вкусовые особенности`}
                    />
                </div>
                <div className={styles.substrate}>
                    <DefaultObserveImage
                        image={{ preview: false }}
                        src_image={getSubstrateProduct(category)}
                        alt={`${product.name_wine} - вино винодельни two-peters.ru. То самое вино, которые выделяют сомелье за его вкусовые особенности`}
                    />
                </div>
                <div className={styles.top}>
                    <h3 className="title-section-font">{product.name_wine}</h3>
                    <span>{product.type}</span>
                </div>
            </Link>

            <div className={styles.bottom}>
                <CanBuy product={product} />
                {product.awards !== null && product.awards.length > 0 && (
                    <div className={styles.awards}>
                        {product.awards.map((award, i) => (
                            <div className={styles.award} key={i}>
                                <DefaultObserveImage
                                    src_image={getAwardSrc(award)}
                                    alt={`Награждается вино винодельни two-peters.ru. Почетная медаль(${award.name}). То самое вино ${product.name_wine}. Дегустация и покупка возможны в сотнях представительств по всей территории РФ`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
