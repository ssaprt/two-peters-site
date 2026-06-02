import { useAppContext } from "@/app/context/AppContext";
import IconTime from "@/assets/icons/common/clock.svg";
import IconColor from "@/assets/icons/product/props/color.svg";
import IconMass from "@/assets/icons/product/props/mass.svg";
import IconOrigin from "@/assets/icons/product/props/origin.svg";
import IconSort from "@/assets/icons/product/props/sort.svg";
import IconThermometer from "@/assets/icons/product/props/thermometer.svg";
import { Awards } from "@/components/Product/Awards/Awards";
import { CanBuy } from "@/components/Product/CanBuy";
import { useMounted } from "@/hooks/Utils/useMounted";
import { getProductSrc, ProductInterface } from "@/lib/api/Products";
import { layoutStore } from "@/stores/LayoutStore";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DescriptionProduct } from "./DescriptionProduct";
import { NameProduct } from "./NameProduct";
import styles from "./ProductTop.module.css";
import { Sertificate } from "./Sertificate";

export const ProductTop = ({ product }: { product: ProductInterface }) => {
    const { isMobile } = useAppContext();
    const mounted = useMounted();
    const leftRef = useRef<HTMLDivElement>(null);
    const [w, setW] = useState(0);
    useEffect(() => {
        layoutStore.addLoadElement("product");
        if (product.awards) layoutStore.addLoadElement("productAwards");
        setW(document.documentElement.clientWidth / 2);
    }, []);
    return (
        <div className={styles.productTop}>
            <div className={styles.leftTop} ref={leftRef}>
                {!isMobile && (
                    <NameProduct
                        title={product.name_wine}
                        to={leftRef.current as HTMLElement}
                    />
                )}
                {!isMobile && (
                    <DescriptionProduct
                        description={product.description}
                        to={leftRef.current as HTMLElement}
                    />
                )}
                {!isMobile && mounted && <CanBuy product={product} />}
                {!isMobile && mounted && <Sertificate product={product} />}
                {!isMobile && mounted && <Awards product={product} />}
            </div>
            <Image
                className={styles.imgProduct}
                style={{
                    objectFit: "contain",
                    width: isMobile ? w : "auto",
                    height: isMobile ? "80%" : "86%",
                }}
                width={0}
                height={0}
                sizes="100vw"
                priority
                onLoad={() => layoutStore.setLoadElement("product")}
                src={getProductSrc(product)}
                alt={`${product.name_wine} - вино винодельни two-peters.ru. То самое вино, которые выделяют сомелье за его вкусовые особенности`}
            />
            <div className={styles.rightTop}>
                {product.sort.length > 0 && (
                    <div className={styles.prop}>
                        <IconSort />
                        <span
                            className={clsx(
                                styles.titleProp,
                                "link-font text-[10px] md:text-[12px] lg:text-[12px]",
                            )}
                        >
                            СОРТ
                        </span>
                        <h3
                            className={clsx(
                                styles.titleValue,
                                "roboto-font text-[12px] md:text-[14px] lg:text-[16px]",
                            )}
                        >
                            {product.sort}
                        </h3>
                    </div>
                )}

                {product.origin > 0 && (
                    <div className={styles.prop}>
                        <IconOrigin />
                        <span
                            className={clsx(
                                styles.titleProp,
                                "link-font text-[10px] md:text-[12px] lg:text-[12px]",
                            )}
                        >
                            год урожая
                        </span>
                        <h3
                            className={clsx(
                                styles.titleValue,
                                "roboto-font text-[12px] md:text-[14px] lg:text-[16px]",
                            )}
                        >
                            {product.origin}
                        </h3>
                    </div>
                )}

                {product.type.length > 0 && (
                    <div className={styles.prop}>
                        <IconColor />
                        <span
                            className={clsx(
                                styles.titleProp,
                                "link-font text-[10px] md:text-[12px] lg:text-[12px]",
                            )}
                        >
                            цвет
                        </span>
                        <h3
                            className={clsx(
                                styles.titleValue,
                                "roboto-font text-[12px] md:text-[14px] lg:text-[16px]",
                            )}
                        >
                            {product.type}
                        </h3>
                    </div>
                )}

                {product.mass > 0 && (
                    <div className={styles.prop}>
                        <IconMass />
                        <span
                            className={clsx(
                                styles.titleProp,
                                "link-font text-[10px] md:text-[12px] lg:text-[12px]",
                            )}
                        >
                            объем
                        </span>
                        <h3
                            className={clsx(
                                styles.titleValue,
                                "roboto-font text-[12px] md:text-[14px] lg:text-[16px]",
                            )}
                        >
                            {product.mass} ml
                        </h3>
                    </div>
                )}

                {product.spirt.length > 0 && (
                    <div className={styles.prop}>
                        <IconThermometer />
                        <span
                            className={clsx(
                                styles.titleProp,
                                "link-font text-[10px] md:text-[12px] lg:text-[12px]",
                            )}
                        >
                            содержание спирта
                        </span>
                        <h3
                            className={clsx(
                                styles.titleValue,
                                "roboto-font text-[12px] md:text-[14px] lg:text-[16px]",
                            )}
                        >
                            {product.spirt} %
                        </h3>
                    </div>
                )}

                {product.seading.length > 0 && (
                    <div className={styles.prop}>
                        <IconTime />
                        <span
                            className={clsx(
                                styles.titleProp,
                                "link-font text-[10px] md:text-[12px] lg:text-[12px]",
                            )}
                        >
                            выдержка
                        </span>
                        <h3
                            className={clsx(
                                styles.titleValue,
                                "roboto-font text-[12px] md:text-[14px] lg:text-[16px]",
                            )}
                        >
                            {product.seading}
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};
