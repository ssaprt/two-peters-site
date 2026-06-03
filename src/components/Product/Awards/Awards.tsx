import { useOperationModal } from "@/hooks/useOperationModal/useOperationModal";
import { getAwardSrc, ProductInterface } from "@/lib/api/Products";
import { FullOverlayModalsControl } from "@/stores/FullOverlayModalsControl";
import { layoutStore } from "@/stores/LayoutStore";
import { WaitingUtils } from "@/stores/WaitingUtils";
import Image from "next/image";
import { useRef } from "react";
import styles from "./Awards.module.css";
import { ButtonAction } from "./ButtonAction";
import { Popup } from "./Popup";

export const Awards = ({ product }: { product: ProductInterface }) => {
    const modalData = useRef(new FullOverlayModalsControl()).current;
    const utilsData = useRef(new WaitingUtils()).current;
    const data = useOperationModal(utilsData, modalData);
    if (product.awards === null) return null;
    return (
        <>
            <div
                className={styles.buttonAwards}
                onClick={() => data.modalData.isOpen()}
            >
                <div className={styles.awardList}>
                    {product.awards.map((award, i) => (
                        <Image
                            key={i}
                            className={styles.imgAward}
                            style={{
                                objectFit: "contain",
                                width: 60,
                                height: 60,
                            }}
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority
                            onLoad={() =>
                                layoutStore.setLoadElement("productAwards")
                            }
                            src={getAwardSrc(award)}
                            alt={`${product.name_wine} - вино винодельни two-peters.ru. То самое вино, которые выделяют сомелье за его вкусовые особенности`}
                        />
                    ))}
                </div>
                <ButtonAction awards={product.awards} />
            </div>
            <Popup
                utilsData={data.utilsData}
                modalData={data.modalData}
                awards={product.awards}
            />
        </>
    );
};
