export type ListItem =
    | "NAME"
    | "CITY"
    | "DATE_START"
    | "DATE_END"
    | "ID"
    | "PRICE"
    | "SORT"
    | "HARVEST"
    | "AWARDS"
    | "COLOR"
    | "DEGREE"
    | "FAIRS";
export type SortDirection = "asc" | "desc" | null;

export type Item = {
    name: ListItem;
    name_field: string;
};

export type AnySortProps = {
    whoSort: Item[];
    //eslint-disable-next-line
    arraySort: Record<string, any>[];
    //eslint-disable-next-line
    returnSort: (sorted: any[], sortFn: (items: any[]) => any[]) => void;
};

export interface SortState {
    field: ListItem | null;
    direction: SortDirection;
}
