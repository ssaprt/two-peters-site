type FairStatus = "end" | "current" | "new";

interface FairDateResult {
    status: FairStatus;
    dateStart: string;
    dateEnd: string;
}

export function normalizeRangeDate(
    dateStartSQL: string,
    dateEndSQL: string,
): FairDateResult {
    const normalize = (date: Date) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const start = normalize(new Date(dateStartSQL));
    const end = normalize(new Date(dateEndSQL));
    const now = normalize(new Date());

    const format = (date: Date) => {
        const d = String(date.getDate()).padStart(2, "0");
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const y = date.getFullYear();
        return `${d}.${m}.${y}`;
    };

    let status: FairStatus;

    if (now > end) {
        status = "end";
    } else if (now >= start && now <= end) {
        status = "current";
    } else {
        status = "new";
    }

    return {
        status,
        dateStart: format(start),
        dateEnd: format(end),
    };
}
