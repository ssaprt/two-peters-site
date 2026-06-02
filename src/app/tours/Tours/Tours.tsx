import { HrBlocks } from "@/components/hr/HrBlocks/HrBlocks";
import { Tour } from "@/components/Tour/Tour";
import { TourDTO } from "@/lib/api/Tours";
import React from "react";
import styles from "./Tours.module.css";

export const Tours = ({ tours }: { tours: TourDTO[] }) => {
    return (
        <div className={styles.tours}>
            {tours.map((tour) => {
                return (
                    <React.Fragment key={tour.id}>
                        <Tour key={tour.id} tour={tour} />
                        {tour.id !== tours[tours.length - 1].id && <HrBlocks />}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
