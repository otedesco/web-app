import { AUTH_SERVER_API } from "~/config/constants";

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
