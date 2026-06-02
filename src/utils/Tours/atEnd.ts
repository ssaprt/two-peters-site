export function atEnd(count: number): string {
    const lastTwo = count % 100;
    const lastOne = count % 10;

    if (lastTwo >= 11 && lastTwo <= 14) {
        return "Винных туров";
    }

    if (lastOne === 1) {
        return "Винный тур";
    }

    if (lastOne >= 2 && lastOne <= 4) {
        return "Винных туров";
    }

    return "Винных туров";
}
