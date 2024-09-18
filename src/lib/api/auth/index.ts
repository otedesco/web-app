import { AUTH_SERVER_API } from "~/config/constants";
import {
  LoginRequest,
  SignUpReponse,
  SignUpRequest,
  VerifyAccountRequest,
} from "./types";

export const signUp = async (
  payload: SignUpRequest,
): Promise<SignUpReponse> => {
  const res = await fetch(`${AUTH_SERVER_API}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.status !== 201) {
    throw new Error("Sign up failed");
  }

  return res.json();
};

export const signIn = async (payload: LoginRequest): Promise<void> => {
  const res = await fetch(`${AUTH_SERVER_API}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.status !== 200) {
    throw new Error("Sign in failed");
  }
};

export const verifyAccount = async (
  payload: VerifyAccountRequest,
): Promise<void> => {
  const res = await fetch(`${AUTH_SERVER_API}/account/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Verification-Token": payload.token,
    },
    body: JSON.stringify({ otp: payload.otp }),
  });

  if (res.status !== 204) {
    throw new Error("Email verification failed");
  }
  return;
};
