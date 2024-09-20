import { AUTH_SERVER_API } from "~/config/constants";
import { getHeaders } from "./utils";
import { ApiReponse, Profile } from "./types";

export type CurrentProfileResponse = ApiReponse<Profile>;

const BASE_PATH = `${AUTH_SERVER_API}/profiles`;

export const getCurrentProfile = async () => {
  const headers = getHeaders();
  const response = await fetch(`${BASE_PATH}/me`, {
    method: "GET",
    headers,
    // credentials: "include",
  });

  if (response.ok) {
    return (await response.json()) as CurrentProfileResponse;
  }

  // TODO: Handle error response and refresh token if needed
  throw new Error("Get current profile failed");
};
