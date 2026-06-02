import { DayTypes } from "@/lib/api/Addresses";
import styles from "./WorkTime.module.css";

export const WorkTime = ({ days }: { days: DayTypes[] }) => {
    const formatter = (day: DayTypes) => {
        if (
            day.start.slice(0, 5) === "00:00" ||
            day.end.slice(0, 5) === "00:00"
        ) {
            return ["Вых", "Вых"];
        }
        return [day.start.slice(0, 5), day.end.slice(0, 5)];
    };

    return (
        <div className={styles.tableWorkB}>
            <div className={styles.leftBB}>
                <span>ПН</span>
                <span>ВТ</span>
                <span>СР</span>
                <span>ЧТ</span>
                <span>ПТ</span>
                <span>СБ</span>
                <span>ВС</span>
            </div>
            <div className={styles.centerBB}>
                <span>{formatter(days[0])[0]}</span>
                <span>{formatter(days[1])[0]}</span>
                <span>{formatter(days[2])[0]}</span>
                <span>{formatter(days[3])[0]}</span>
                <span>{formatter(days[4])[0]}</span>
                <span>{formatter(days[5])[0]}</span>
                <span>{formatter(days[6])[0]}</span>
            </div>
            <div className={styles.endBB}>
                <span>{formatter(days[0])[1]}</span>
                <span>{formatter(days[1])[1]}</span>
                <span>{formatter(days[2])[1]}</span>
                <span>{formatter(days[3])[1]}</span>
                <span>{formatter(days[4])[1]}</span>
                <span>{formatter(days[5])[1]}</span>
                <span>{formatter(days[6])[1]}</span>
            </div>
        </div>
    );
};
