import { AUTH_SERVER_API } from "~/config/constants";
import { cookies } from "next/headers";

import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import createAPI from "~/lib/axios";

import {
  Account,
  AccountDetails,
  Authentication,
  Profile,
  ProfileDetails,
  ResendVerificationCodeRequest,
  ResendVerificationCodeResponse,
  Role,
  SignInRequest,
  SignUpRequest,
  VerificationMethod,
  VerifyAccountRequest,
} from "./types";

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const accessToken = cookies().get("accessToken")?.value;
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
};

const responseInterceptor = <T>(response: AxiosResponse<T>) => response.data;

const errorInterceptor = (response: AxiosResponse) => {
  if (response instanceof AxiosError) {
    console.error("API Error:", response.response?.data);
    // TODO: Handle errors (e.g., refresh token if needed)
    return Promise.reject(response);
  }

  return response;
};

const cerberusAPI = createAPI(
  {
    baseURL: AUTH_SERVER_API,
    getAccessToken: () => cookies().get("accessToken")?.value,
  },
  requestInterceptor,
  [responseInterceptor, errorInterceptor],
);

// Account functions
export const verifyAccount = ({ token, ...payload }: VerifyAccountRequest) =>
  cerberusAPI.post<void>(`/account/verify`, payload, {
    headers: {
      "x-verification-token": token,
    },
  });

export const resendVerificationCode = ({
  method,
  ...payload
}: ResendVerificationCodeRequest) =>
  cerberusAPI.post<ResendVerificationCodeResponse>(
    `/account/resend-verification-code`,
    payload,
    {
      params: { method: method === VerificationMethod.EMAIL ? "email" : "sms" },
    },
  );

export const updateAccount = (payload: Partial<Account>) =>
  cerberusAPI.patch<unknown>(`/account`, payload);

export const getAccountDetailsDetails = () =>
  cerberusAPI.get<AccountDetails>(`/account/details`);

export const updateAccountDetails = (payload: Partial<AccountDetails>) =>
  cerberusAPI.patch<AccountDetails>(`/account/details`, payload);

// Authentication functions
export const signUp = (payload: SignUpRequest) =>
  cerberusAPI.post<Account>(`/auth/sign-up`, payload);

export const signIn = (payload: SignInRequest) =>
  cerberusAPI.post<Authentication>(`/auth/sign-in`, payload);

export const signOut = () => cerberusAPI.post(`/auth/sign-out`);

// Profile functions
export const getCurrentProfile = () => cerberusAPI.get<Profile>(`/profiles/me`);

export const updateProfile = (payload: Partial<Profile>) =>
  cerberusAPI.patch<Profile>(`/profiles/me`, payload);

export const updateProfileDetails = (payload: Partial<ProfileDetails>) =>
  cerberusAPI.patch<ProfileDetails>(`/profiles/me/details`, payload);

export const getProfileDetails = () =>
  cerberusAPI.get<ProfileDetails>(`/profiles/me/details`);

// Role functions
export const createRole = (payload: Partial<Role>) =>
  cerberusAPI.post<Role>(`/role`, payload);
