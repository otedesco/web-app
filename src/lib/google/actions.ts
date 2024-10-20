"use server";
import { getPlacesAutocomplete } from "./api";
import { Place } from "./types";

export const getPlacesAutocompleteAction = async (
  input: string,
): Promise<Place[]> => {
  if (!input) return [];

  const response = await getPlacesAutocomplete(input);

  return response.predictions.map((prediction) => ({
    place_id: prediction.place_id,
    description: prediction.description,
    terms: prediction.terms,
  }));
};
