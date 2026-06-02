import styles from "./AnySort.module.css";

import { AnySortProps } from "@/types/AnySortTypes";
import { useAnySort } from "@/hooks/AnySort/useAnySort";
import { SortItem } from "./SortItem";

const AnySort = function ({ whoSort, arraySort, returnSort }: AnySortProps) {
  const { handleSort, sortState, getSortIcon } = useAnySort({ arraySort, returnSort });

  return (
    <div className={styles.root}>
      <span>Сортировать по:</span>
      {whoSort.map((item) => {
        const sortDirection = getSortIcon(item.name);
        const isActive = sortState.field === item.name;

        return (
          <SortItem
            key={item.name}
            isActive={isActive}
            sortDirection={sortDirection}
            item={item}
            handleSort={handleSort}
            sortState={sortState}
          />
        );
      })}
    </div>
  );
};

export default AnySort;
