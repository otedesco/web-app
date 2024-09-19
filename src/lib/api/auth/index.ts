import { AUTH_SERVER_API } from "~/config/constants";
import type {
  LoginRequest,
  SignUpResponse,
  SignUpRequest,
  VerifyAccountRequest,
} from "./types";

export const signUp = async (
  payload: SignUpRequest,
): Promise<SignUpResponse> => {
  const response = await fetch(`${AUTH_SERVER_API}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return (await response.json()) as SignUpResponse;
  }

  throw new Error("Sign up failed");
};

export const signIn = async (payload: LoginRequest): Promise<void> => {
  const response = await fetch(`${AUTH_SERVER_API}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Sign in failed");
  }
};

export const verifyAccount = async (
  payload: VerifyAccountRequest,
): Promise<void> => {
  const response = await fetch(`${AUTH_SERVER_API}/account/verify`, {
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
