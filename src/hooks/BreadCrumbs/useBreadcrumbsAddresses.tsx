import { breadCrumbsStorageAddresses } from "@/stores/BreadCrumbsStorage";

export const useBreadCrumbsAddresses = () => {
    const breadCrumbs = breadCrumbsStorageAddresses;
    return breadCrumbs;
};
