import CloseIcon from "@/assets/icons/common/clear.svg";
import { InputAndLabelTextBox } from "@/components/input/InputAndLabelTextBox/InputAndLabelTextBox";
import AnySort from "@/components/sort/AnySort/AnySort";
import { SearcherStore } from "@/stores/SearcherStore";
import { AnySortProps } from "@/types/AnySortTypes";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";

interface SearchProps {
    //eslint-disable-next-line
    searcherStore?: SearcherStore<any>;
    //sort
    sort?: AnySortProps;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Search = observer(
    ({ searcherStore, sort, style, children }: SearchProps) => {
        const [val, setVal] = useState<string>("");

        useEffect(() => {
            return () => {
                searcherStore?.setSearchValue("");
            };
        }, []);

        const searchHandler = () => searcherStore?.setSearchValue(val);
        return (
            <div className={styles.header} style={style}>
                <div className={styles.left}>
                    <div className={styles.defaultSearcher}>
                        {searcherStore && (
                            <InputAndLabelTextBox
                                props={{
                                    value: val,
                                    placeholder: "",
                                    onChange: (
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        setVal(e.target.value);
                                        searchHandler();
                                    },
                                    onKeyDown: (
                                        e: React.KeyboardEvent<HTMLInputElement>,
                                    ) => {
                                        if (e.code === "Enter") {
                                            searchHandler();
                                        }
                                    },
                                }}
                                idAndForHTML="search"
                                labelText="Поиск..."
                            />
                        )}
                        {val && (
                            <CloseIcon
                                className={styles.closeIcon}
                                onClick={() => {
                                    setVal("");
                                    searcherStore?.setSearchValue("");
                                }}
                            />
                        )}
                    </div>
                    {sort && <AnySort {...sort} />}
                </div>
                {children}
            </div>
        );
    },
);
