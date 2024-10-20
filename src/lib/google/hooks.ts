import { createQueryHook } from "../react-query/utils";
import { getPlacesAutocompleteAction } from "./actions";

export const useSearchPlaces = (searchTerm: string) => {
  const query = createQueryHook(
    () => getPlacesAutocompleteAction(searchTerm),
    ["places", searchTerm],
    {
      enabled: !!searchTerm,
      refetchOnWindowFocus: false,
    },
  )();

  return query;
};
