import { Item, SortState } from "@/types/AnySortTypes";
import FairsIcon from "@assets/icons/common/fairs.svg";
import AddressIcon from "@assets/icons/sort/address.svg";
import AwardsIcon from "@assets/icons/sort/awards.svg";
import CalendarFromIcon from "@assets/icons/sort/calendar-from.svg";
import CalendarToIcon from "@assets/icons/sort/calendar-to.svg";
import CalendarIcon from "@assets/icons/sort/calendar.svg";
import ColorIcon from "@assets/icons/sort/color.svg";
import DegreeIcon from "@assets/icons/sort/degree.svg";
import NameIcon from "@assets/icons/sort/font.svg";
import PriceIcon from "@assets/icons/sort/price.svg";
import SeedingIcon from "@assets/icons/sort/seeding.svg";
import SortWineIcon from "@assets/icons/sort/sort-wine.svg";
import SortIcon from "@assets/icons/sort/sort.svg";
import styles from "./AnySort.module.css";

interface SortItemProps {
    isActive: boolean;
    item: Item;
    sortDirection: "asc" | "desc" | null;
    handleSort: (item: Item) => void;
    sortState: SortState;
}

export const SortItem = ({
    item,
    isActive,
    sortDirection,
    handleSort,
    sortState,
}: SortItemProps) => {
    const props = {
        icon: <></>,
        tooltip: "",
    };

    switch (item.name) {
        case "NAME":
            props.icon = <NameIcon className={styles.icon} />;
            props.tooltip = `Сортировать по имени (${sortState.direction === "desc" ? "по убыванию" : "по возрастанию"})`;
            break;
        case "CITY":
            props.icon = <AddressIcon className={styles.icon} />;
            props.tooltip = `Сортировать по городу (${sortState.direction === "desc" ? "по убыванию" : "по возрастанию"})`;
            break;
        case "ID":
            props.icon = <CalendarIcon className={styles.icon} />;
            props.tooltip = `Сортировать по дате создания (${sortState.direction === "desc" ? "по убыванию" : "по возрастанию"})`;
            break;
        case "DATE_START":
            props.icon = <CalendarToIcon className={styles.icon} />;
            props.tooltip = `Сортировать по дате начала (${sortState.direction === "desc" ? "по убыванию" : "по возрастанию"})`;
            break;
        case "DATE_END":
            props.icon = <CalendarFromIcon className={styles.icon} />;
            props.tooltip = `Сортировать по дате окончания (${sortState.direction === "desc" ? "по убыванию" : "по возрастанию"})`;
            break;
        case "PRICE":
            props.icon = <PriceIcon className={styles.icon} />;
            props.tooltip = `Сортировать по цене (${sortState.direction === "desc" ? "по убыванию" : "по возрастанию"})`;
            break;
        case "SORT":
            props.icon = <SortWineIcon className={styles.icon} />;
            props.tooltip = `Сортировать по сорту (${sortState.direction === "desc" ? "по убыванию" : "по возрастанию"})`;
            break;
        case "HARVEST":
            props.icon = <SeedingIcon className={styles.icon} />;
            props.tooltip = `Сортировать по году урожая (${sortState.direction === "desc" ? "по убыванию" : "по возрастанию"})`;
            break;
        case "AWARDS":
            props.icon = <AwardsIcon className={styles.icon} />;
            props.tooltip = `Сортировать по количеству наград (${sortState.direction === "desc" ? "по убыванию" : "по возрастанию"})`;
            break;
        case "FAIRS":
            props.icon = <FairsIcon className={styles.icon} />;
            props.tooltip = `Сортировать по количеству событий (${sortState.direction === "desc" ? "по убыванию" : "по возрастанию"})`;
            break;
        case "COLOR":
            props.icon = <ColorIcon className={styles.icon} />;
            props.tooltip = `Сортировать по цвету (${sortState.direction === "desc" ? "по убыванию" : "по возрастанию"})`;
            break;
        case "DEGREE":
            props.icon = <DegreeIcon className={styles.icon} />;
            props.tooltip = `Сортировать по содержанию спирта (${sortState.direction === "desc" ? "по убыванию" : "по возрастанию"})`;
            break;
    }

    return (
        <div
            className={`${styles.item} ${isActive ? styles.active : ""}`}
            onClick={() => handleSort(item)}
            data-tooltip={props.tooltip}
        >
            {props.icon}
            <SortIcon
                className={`${styles.sortIcon} ${sortDirection === "asc" ? styles.asc : styles.desc}`}
            />
        </div>
    );
};
