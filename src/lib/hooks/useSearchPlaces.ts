import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

interface Place {
  place_id: string;
  description: string;
}

interface SearchPlacesResponse {
  predictions: Array<{
    place_id: string;
    description: string;
    terms: { offset: number; value: string }[];
  }>;
}

const fetchPlaces = async (input: string): Promise<Place[]> => {
  if (!input) return [];

  const response = await fetch(
    `/api/places?input=${encodeURIComponent(input)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  const data = (await response.json()) as SearchPlacesResponse;
  return data.predictions.map((prediction) => ({
    place_id: prediction.place_id,
    description: prediction.description,
    terms: prediction.terms,
  }));
};

export const useSearchPlaces = (searchTerm: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["places", searchTerm],

    queryFn: () => fetchPlaces(searchTerm),

    enabled: !!searchTerm,
    refetchOnWindowFocus: false,
  });

  const searchPlaces = useCallback(async () => {
    if (searchTerm) {
      await refetch();
    }
  }, [searchTerm, refetch]);

  return {
    places: data ?? [],
    isLoading,
    error,
    searchPlaces,
  };
};
