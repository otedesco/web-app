export interface Place {
  place_id: string;
  description: string;
  terms: { offset: number; value: string }[];
}

export interface SearchPlacesResponse {
  predictions: Array<Place>;
}
