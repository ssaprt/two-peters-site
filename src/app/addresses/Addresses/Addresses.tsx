import AddressIcon from "@/assets/icons/common/addresses.svg";
import Cls from "@/assets/icons/common/cls.svg";
import SearchButton from "@/assets/icons/common/search.svg";
import { AddressComponent } from "@/components/AddressComponent/AddressComponent";
import { BreadCrumbs } from "@/components/breadcrumbs/BreadCrumbs";
import { NotFound } from "@/components/emptyPlaceholders/NotFound/NotFound";
import { Search } from "@/components/searcher/Search/Search";
import { TitleSection } from "@/components/titles/TitleWithLogo/TitleSection";
import { useAddressesContent } from "@/hooks/Addresses/useAddressesContent";
import { useMounted } from "@/hooks/Utils/useMounted";
import { AddressType } from "@/lib/api/Addresses";
import { SearcherStore } from "@/stores/SearcherStore";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Addresses.module.css";

export const Addresses = observer(
    ({ addresses }: { addresses: AddressType[] }) => {
        const mounted = useMounted();
        const [showSearchButton, setShowSearchButton] = useState(false);
        const [showSearch, setShowSearch] = useState(true);
        const searchInstance = useRef(new SearcherStore(() => addresses));
        const breadCrumbs = useAddressesContent({
            addresses,
            searchInstance: searchInstance.current,
        });

        if (!mounted) return null;
        return (
            <>
                <div className={styles.addresses}>
                    {createPortal(
                        <>
                            <Search
                                style={{
                                    display: showSearch ? "block" : "none",
                                }}
                                searcherStore={searchInstance.current}
                                sort={{
                                    whoSort: [
                                        {
                                            name: "NAME",
                                            name_field: "name",
                                        },
                                        {
                                            name: "CITY",
                                            name_field: "city",
                                        },
                                        {
                                            name: "FAIRS",
                                            name_field: "fairs_ids",
                                        },
                                    ],
                                    arraySort:
                                        searchInstance.current.filterList,
                                    returnSort: (sorted, sortFn) => {
                                        breadCrumbs.sortFn = sortFn;
                                        breadCrumbs.setItems<AddressType>(
                                            sorted as AddressType[],
                                        );
                                    },
                                }}
                            >
                                <Cls
                                    className={styles.close}
                                    onClick={() => {
                                        setShowSearchButton(true);
                                        setShowSearch(false);
                                    }}
                                />
                            </Search>
                        </>,
                        document.getElementById("header")!,
                    )}
                    {createPortal(
                        <SearchButton
                            className={styles.search}
                            style={{
                                display: showSearchButton ? "block" : "none",
                            }}
                            onClick={() => {
                                setShowSearchButton(false);
                                setShowSearch(true);
                            }}
                        />,
                        document.getElementById("header")!,
                    )}
                    <TitleSection
                        title="Адреса реализации"
                        style={{ marginTop: "20px" }}
                    />
                    <BreadCrumbs breadCrumbs={breadCrumbs} />
                    {breadCrumbs.currentItems.length ? (
                        breadCrumbs.currentItems.map((address) => (
                            <AddressComponent
                                key={address.id}
                                address={address}
                            />
                        ))
                    ) : (
                        <NotFound
                            title="Адреса не найдены"
                            icon={<AddressIcon />}
                        />
                    )}
                    <BreadCrumbs breadCrumbs={breadCrumbs} />
                </div>
            </>
        );
    },
);
function useMoubnted() {
    throw new Error("Function not implemented.");
}
