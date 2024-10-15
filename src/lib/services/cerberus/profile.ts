import { AUTH_SERVER_API } from "~/config/constants";
import { getHeaders } from "./utils";
import { ApiReponse, Profile, ProfileDetails } from "./types";

export type CurrentProfileResponse = ApiReponse<Profile>;

const BASE_PATH = `${AUTH_SERVER_API}/profiles`;

export const getCurrentProfile = async () => {
  const response = await fetch(`${BASE_PATH}/me`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (response.ok) {
    return (await response.json()) as CurrentProfileResponse;
  }
  const error = (await response.json()) as unknown;
  console.log(error);
  // TODO: Handle error response and refresh token if needed
  throw new Error("Get current profile failed");
};

export const updateProfile = async (payload: Partial<Profile>) => {
  const headers = getHeaders();

  const response = await fetch(`${BASE_PATH}/me`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    return (await response.json()) as CurrentProfileResponse;
  }

  const error = (await response.json()) as unknown;
  console.log(error);
  // TODO: Handle error response and refresh token if needed
  throw new Error("Update profile failed");
};

export const updateProfileDetails = async (
  payload: Partial<ProfileDetails>,
) => {
  const response = await fetch(`${BASE_PATH}/me/details`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    return (await response.json()) as CurrentProfileResponse;
  }

  const error = (await response.json()) as unknown;
  console.log(error);
  // TODO: Handle error response and refresh token if needed
  throw new Error("Update profile details failed");
};

export const getProfileDetails = async () => {
  const response = await fetch(`${BASE_PATH}/me/details`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (response.ok) {
    return (await response.json()) as CurrentProfileResponse;
  }

  const error = (await response.json()) as unknown;
  console.error(error);
  // TODO: Handle error response and refresh token if needed
  throw new Error("Get profile details failed");
};
