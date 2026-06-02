//eslint-disable-next-line
export function search(dataSearch: any[], searchValue: string): any[] {
  if (!dataSearch || !Array.isArray(dataSearch)) {
    return dataSearch;
  }

  if (!searchValue.trim()) {
    return dataSearch;
  }

  const searchTerm = searchValue.toLowerCase();

  //eslint-disable-next-line
  const extractStringValues = (obj: any): string[] => {
    const values: string[] = [];

    for (const key in obj) {
      if (key.startsWith("$") || key.includes("Symbol")) continue;

      const value = obj[key];

      if (typeof value === "string") {
        values.push(value);
      } else if (typeof value === "number") {
        values.push(String(value));
      } else if (typeof value === "boolean") {
        values.push(String(value));
      }
    }

    return values;
  };

  const filtered = dataSearch.filter((item) => {
    const stringValues = extractStringValues(item);
    return stringValues.some((value) => value.toLowerCase().includes(searchTerm));
  });

  return filtered;
}
