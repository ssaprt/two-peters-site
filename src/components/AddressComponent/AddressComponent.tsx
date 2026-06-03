import { useAppContext } from "@/app/context/AppContext";
import IconCalendar from "@/assets/icons/common/clock.svg";
import IconFairs from "@/assets/icons/common/fairs.svg";
import Phone from "@/assets/icons/fairs/call.svg";
import { useOperationModal } from "@/hooks/useOperationModal/useOperationModal";
import {
    AddressType,
    DEFAULT_EXAMPLE_ADDRESSES,
    getAddressImage,
} from "@/lib/api/Addresses";
import { FullOverlayModalsControl } from "@/stores/FullOverlayModalsControl";
import { WaitingUtils } from "@/stores/WaitingUtils";
import clsx from "clsx";
import Link from "next/link";
import { useRef } from "react";
import { DefaultObserveImage } from "../image/DefaultObserveImage/DefaultObserveImage";
import { WorkTime } from "../worktime/WorkTime";
import styles from "./AddressComponent.module.css";
import { Bunner } from "./Bunner";
import { Popup } from "./Popup";

export const AddressComponent = ({
    address,
    general = true,
}: {
    address: AddressType;
    general?: boolean;
}) => {
    const { timeStore, isMobile } = useAppContext();
    const modalData = useRef(new FullOverlayModalsControl()).current;
    const utilsData = useRef(new WaitingUtils()).current;
    const data = useOperationModal(utilsData, modalData);

    if (!timeStore.getTime) return null;

    const time = new Intl.DateTimeFormat("ru-RU", {
        timeZone: address.timezone,
        hour: "2-digit",
        minute: "2-digit",
    }).format(timeStore.getTime);

    return (
        <div className={styles.address}>
            <div
                className={clsx(
                    styles.imgBox,
                    `
                       lg:w-[400px]
                       self-center
                       md:self-start`,
                )}
            >
                {address.timezone.length > 0 && (
                    <div className={styles.bunnerOverlay}>
                        <div className={styles.time}>
                            <span key={time}>{time}</span>
                            <span>статус заведения</span>
                        </div>
                        <div className={styles.work}>
                            <IconCalendar data-tooltip="Местное время" />
                        </div>
                        <Bunner
                            days={address.days}
                            timezone={address.timezone}
                        />
                    </div>
                )}

                {address.fairs_ids.length > 0 && (
                    <div
                        className={styles.iconFairs}
                        data-tooltip={`Связанные события\nНажмите, чтобы посмотреть`}
                    >
                        <div
                            className={styles.ifairs}
                            onClick={() => data.modalData.isOpen()}
                        >
                            <IconFairs />
                        </div>
                    </div>
                )}

                <DefaultObserveImage
                    video={{
                        muted: true,
                        controls: true,
                    }}
                    image={{
                        preview: !isMobile,
                    }}
                    src_image={getAddressImage(address.id, address.img_address)}
                    fallbackSrc={DEFAULT_EXAMPLE_ADDRESSES}
                    alt={address.description}
                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.isAddress}>
                    {address.city}, {address.address}
                </h3>
                <div className={clsx(styles.board, "link-font")}>
                    {address.type_address}
                    {address.name.length > 0 && " - " + address.name}
                </div>
                <span className={styles.description}>
                    {address.description}
                </span>
                {address.phone_address !== null && (
                    <Link
                        className={styles.phone}
                        href={`tel:${address.phone_address}`}
                    >
                        <Phone />
                        <span>{address.phone_address}</span>
                    </Link>
                )}
                {general && <WorkTime days={address!.days} />}
            </div>
            {address.fairs_ids.length > 0 && (
                <Popup
                    modalData={data.modalData}
                    utilsData={data.utilsData}
                    address={address}
                />
            )}
        </div>
    );
};
