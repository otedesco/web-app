import { AUTH_SERVER_API } from "~/config/constants";
import { getHeaders } from "./utils";
import { AccountDetails, ApiReponse } from "./types";

export interface VerifyAccountRequest {
  token: string;
  otp: string;
}

const BASE_PATH = `${AUTH_SERVER_API}/account`;

export const verifyAccount = async (
  payload: VerifyAccountRequest,
): Promise<void> => {
  const response = await fetch(`${BASE_PATH}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Verification-Token": payload.token,
    },
    body: JSON.stringify({ otp: payload.otp }),
  });

  if (!response.ok) {
    throw new Error("Email verification failed");
  }
};

export const getAccountDetailsDetails = async (): Promise<
  ApiReponse<AccountDetails>
> => {
  const response = await fetch(`${BASE_PATH}/details`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to get account details");
  }

  const data = (await response.json()) as ApiReponse<AccountDetails>;

  return data;
};

export const updateAccountDetails = async (
  payload: Partial<AccountDetails>,
): Promise<ApiReponse<AccountDetails>> => {
  const response = await fetch(`${BASE_PATH}/details`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return (await response.json()) as ApiReponse<AccountDetails>;
  }

  const error = (await response.json()) as unknown;
  console.log(error);
  // TODO: Handle error response and refresh token if needed
  throw new Error("Update profile details failed");
};
