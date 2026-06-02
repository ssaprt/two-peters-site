export * from "./useLocationInfo";

export interface LocationInfo {
  pathname: string;
  searchParams: URLSearchParams;
  hash: string;
  state: any;
  fullPath: string;

  isPath: (path: string) => boolean;
  startsWith: (path: string) => boolean;
  includes: (segment: string) => boolean;

  getQuery: (key: string) => string | null;
  getQueryArray: (key: string) => string[];
  hasQueryParam: (key: string) => boolean;
  getAllQueryParams: () => Record<string, string>;

  navigateWithParams: (to: string, paramsToPreserve?: string[]) => void;
  navigatePreservingAll: (to: string, excludeParams?: string[]) => void;
  updateQueryParam: (
    key: string,
    value: string | null,
    replace?: boolean
  ) => void;
  removeQueryParam: (key: string, replace?: boolean) => void;
  clearAllParams: (replace?: boolean) => void;

  isActivePath: (path: string, exact?: boolean) => boolean;
  isActiveWithParams: (
    path: string,
    params?: Record<string, string>
  ) => boolean;
  getPathSegments: () => string[];

  getCurrentUrl: () => URL;
  createUrl: (path: string, params?: Record<string, string>) => string;
}
