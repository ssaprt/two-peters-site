import {
    AnySortProps,
    Item,
    ListItem,
    SortDirection,
    SortState,
} from "@/types/AnySortTypes";
import { useCallback, useState } from "react";

export const useAnySort = ({
    arraySort,
    returnSort,
}: Omit<AnySortProps, "whoSort">) => {
    const [sortState, setSortState] = useState<SortState>({
        field: null,
        direction: null,
    });

    const handleSort = useCallback(
        (item: Item) => {
            const isSameField = sortState.field === item.name;
            let newDirection: SortDirection;

            if (!isSameField) {
                newDirection = "asc";
            } else if (sortState.direction === "asc") {
                newDirection = "desc";
            } else if (sortState.direction === "desc") {
                newDirection = null;
            } else {
                newDirection = "asc";
            }

            if (newDirection === null) {
                setSortState({ field: null, direction: null });

                const identitySort = <T,>(items: T[]) => items;

                returnSort([...arraySort], identitySort);
                return;
            }

            //  eslint-disable-next-line
            const sortFn = <T extends any>(items: T[]): T[] => {
                const sorted = [...items];

                switch (item.name) {
                    case "NAME":
                    case "CITY":
                    case "SORT":
                    case "COLOR":
                    case "DEGREE":
                        //eslint-disable-next-line
                        sorted.sort((a: any, b: any) => {
                            const comparison = a[item.name_field].localeCompare(
                                b[item.name_field],
                            );
                            return newDirection === "desc"
                                ? -comparison
                                : comparison;
                        });
                        break;

                    case "ID":
                    case "PRICE":
                    case "HARVEST":
                        //eslint-disable-next-line
                        sorted.sort((a: any, b: any) => {
                            const valA = Number(a[item.name_field]) || 0;
                            const valB = Number(b[item.name_field]) || 0;
                            const comparison = valA - valB;
                            return newDirection === "desc"
                                ? -comparison
                                : comparison;
                        });
                        break;

                    case "DATE_START":
                    case "DATE_END":
                        //eslint-disable-next-line
                        sorted.sort((a: any, b: any) => {
                            const comparison =
                                new Date(a[item.name_field]).getTime() -
                                new Date(b[item.name_field]).getTime();
                            return newDirection === "desc"
                                ? -comparison
                                : comparison;
                        });
                        break;

                    case "AWARDS":
                    case "FAIRS":
                        //eslint-disable-next-line
                        sorted.sort((a: any, b: any) => {
                            const valA = a[item.name_field]?.length || 0;
                            const valB = b[item.name_field]?.length || 0;
                            const comparison = valA - valB;
                            return newDirection === "desc"
                                ? -comparison
                                : comparison;
                        });
                        break;
                }

                return sorted;
            };

            const sorted = sortFn(arraySort);

            setSortState({ field: item.name, direction: newDirection });

            returnSort(sorted, sortFn);
        },
        [sortState, arraySort, returnSort],
    );

    const getSortIcon = (itemName: ListItem) => {
        if (sortState.field !== itemName) return null;
        return sortState.direction === "desc" ? "desc" : "asc";
    };

    return {
        handleSort,
        sortState,
        getSortIcon,
    };
};
