import createAPI from "~/lib/axios";
import { GOOGLE_MAPS_API_KEY } from "~/config/constants";
import { AxiosError, AxiosResponse } from "axios";
import { SearchPlacesResponse } from "./types";

const errorInterceptor = (response: any) => {
  if (response instanceof AxiosError) {
    console.error("Google Maps API Error:", response);

    return Promise.reject(response);
  }

  return response as AxiosResponse;
};

const responseInterceptor = (response: AxiosResponse): AxiosResponse =>
  response;

const googleMapsAPI = createAPI(
  {
    baseURL: "https://maps.googleapis.com/maps/api",
  },
  undefined, // no request interceptors
  [errorInterceptor, responseInterceptor],
);

export const getPlacesAutocomplete = async (input: string) => {
  const response = await googleMapsAPI.get<SearchPlacesResponse>(
    "/place/autocomplete/json",
    {
      params: {
        input: input,
        key: GOOGLE_MAPS_API_KEY,
      },
    },
  );

  return response.data;
};
