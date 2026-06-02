import { useOperationModal } from "@/hooks/useOperationModal/useOperationModal";
import { getAwardSrc, ProductInterface } from "@/lib/api/Products";
import { FullOverlayModalsControl } from "@/stores/FullOverlayModalsControl";
import { layoutStore } from "@/stores/LayoutStore";
import { WaitingUtils } from "@/stores/WaitingUtils";
import Image from "next/image";
import styles from "./Awards.module.css";
import { ButtonAction } from "./ButtonAction";
import { Popup } from "./Popup";

export const Awards = ({ product }: { product: ProductInterface }) => {
    const { modalData, utilsData } = useOperationModal(
        new WaitingUtils(),
        new FullOverlayModalsControl(),
    );
    if (product.awards === null) return null;
    return (
        <>
            <div
                className={styles.buttonAwards}
                onClick={() => modalData.isOpen()}
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
                utilsData={utilsData}
                modalData={modalData}
                awards={product.awards}
            />
        </>
    );
};
