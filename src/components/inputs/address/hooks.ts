import { useMemo } from "react";
import { useDebounce } from "use-debounce";

export function useDebouncedFilter<T>(
  items: T[],
  searchTerm: string,
  filterFn: (item: T, term: string) => boolean,
) {
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const filteredItems = useMemo(() => {
    return items.filter((item) => filterFn(item, debouncedSearchTerm));
  }, [items, debouncedSearchTerm, filterFn]);

  return filteredItems;
}
