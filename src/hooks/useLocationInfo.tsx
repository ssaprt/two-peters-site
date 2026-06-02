import { useLocation } from "react-router-dom";
import { Location } from "../types";
export const useLocationInfo = () => {
  const location: Location = useLocation();

  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    hash: location.hash,
    state: location.state,
    isPath: (path: string) => location.pathname === path,
    startsWith: (path: string) => location.pathname.startsWith(path),
    includes: (segment: string) => location.pathname.includes(segment),
    getQuery: (key: string) => new URLSearchParams(location.search).get(key),
  };
};
