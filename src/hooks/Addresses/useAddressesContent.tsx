import { AddressType } from "@/lib/api/Addresses";
import { SearcherStore } from "@/stores/SearcherStore";
import { useEffect } from "react";
import { useBreadCrumbsAddresses } from "../BreadCrumbs/useBreadcrumbsAddresses";

export const useAddressesContent = ({
    addresses,
    searchInstance,
}: {
    addresses: AddressType[];
    searchInstance: SearcherStore<AddressType>;
}) => {
    // инициализация хлебных крошек
    const breadCrumbs = useBreadCrumbsAddresses();
    const { filterList } = searchInstance;
    useEffect(() => {
        breadCrumbs.setItems<AddressType>(filterList);
        //eslint-disable-next-line
        breadCrumbs.setItemsPerPage = 12;
    }, [filterList, breadCrumbs.setItems, addresses.length]);

    return breadCrumbs;
};
