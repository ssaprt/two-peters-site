import { makeAutoObservable, runInAction } from "mobx";

export class Time {
    // eslint-disable-next-line
    interval: any;

    time: number | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get getTime() {
        return this.time;
    }

    globalTimeRefreshStart = () => {
        runInAction(() => {
            this.time = Date.now();
        });

        const delay = 10000;

        this.interval = setInterval(() => {
            const now = Date.now();

            if (!this.time) {
                this.time = now;
                return;
            }

            const prevMinute = new Date(this.time).getMinutes();
            const currentMinute = new Date(now).getMinutes();

            if (prevMinute !== currentMinute) {
                runInAction(() => {
                    this.time = now;
                });
            }
        }, delay);
    };

    globalTimeRefreshStop = () => {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    getWeekDay(timezone: string, timestamp: number) {
        const day = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            weekday: "short",
        })
            .formatToParts(timestamp)
            .find((p) => p.type === "weekday")?.value;

        const map: Record<string, number> = {
            Mon: 1,
            Tue: 2,
            Wed: 3,
            Thu: 4,
            Fri: 5,
            Sat: 6,
            Sun: 7,
        };

        return map[day as string];
    }

    getCurrentMinutes(timezone: string, timestamp: number) {
        const parts = new Intl.DateTimeFormat("en-GB", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }).formatToParts(timestamp);

        const hours = Number(parts.find((p) => p.type === "hour")?.value);

        const minutes = Number(parts.find((p) => p.type === "minute")?.value);

        return hours * 60 + minutes;
    }

    parseTimeToMinutes(time: string) {
        const [h, m] = time.split(":").map(Number);

        return h * 60 + m;
    }

    // eslint-disable-next-line
    isOpenNow(days: any[], timezone: string, timestamp: number) {
        const currentDay = this.getWeekDay(timezone, timestamp);

        const currentMinutes = this.getCurrentMinutes(timezone, timestamp);

        const today = days.find((d) => d.day === currentDay);

        if (!today || today.day_off) return false;

        const start = this.parseTimeToMinutes(today.start);

        const end = this.parseTimeToMinutes(today.end);

        return currentMinutes >= start && currentMinutes < end;
    }
}

export const timeStore = new Time();
