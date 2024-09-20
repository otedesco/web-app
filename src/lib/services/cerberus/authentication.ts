import { AUTH_SERVER_API } from "~/config/constants";
import { Account, ApiReponse, Authentication } from "./types";

export type SignUpResponse = ApiReponse<Account>;

export type SignInResponse = ApiReponse<Authentication>;

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  // FIXME: passwordConfirmation --> password_confirmation;
  passwordConfirmation: string;
  name: string;
  lastname: string;
}

const BASE_PATH = `${AUTH_SERVER_API}/auth`;

export const signUp = async (
  payload: SignUpRequest,
): Promise<SignUpResponse> => {
  const response = await fetch(`${BASE_PATH}/sign-up`, {
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

export const signIn = async (
  payload: SignInRequest,
): Promise<SignInResponse> => {
  const response = await fetch(`${BASE_PATH}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return (await response.json()) as SignInResponse;
  }

  throw new Error("Sign in failed");
};
