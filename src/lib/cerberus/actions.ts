"use server";

import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "~/config/constants";
import { uploadAvatar } from "~/lib/services/blob";
import * as api from "./api";
import {
  Account,
  AccountDetails,
  Profile,
  ProfileDetails,
  ResendVerificationCodeRequest,
  Role,
  SignInRequest,
  SignUpRequest,
  VerifyAccountRequest,
} from "./types";

// Authentication
export const signUpAction = async (payload: SignUpRequest) => {
  console.log("signUpAction");
  const response = await api.signUp(payload);
  return response.data;
};

export const signInAction = async (payload: SignInRequest) => {
  console.log("signInAction");
  const response = await api.signIn(payload);
  cookies().set(
    "accessToken",
    response.data.accessToken,
    ACCESS_TOKEN_COOKIE_OPTIONS,
  );
  cookies().set(
    "refreshToken",
    response.data.refreshToken,
    REFRESH_TOKEN_COOKIE_OPTIONS,
  );
  cookies().set("isLoggedIn", "true", {
    ...ACCESS_TOKEN_COOKIE_OPTIONS,
    httpOnly: false,
  });
  return response.data;
};

export const signOutAction = async () => {
  console.log("signOutAction");
  await api.signOut();
  cookies().set("accessToken", "", ACCESS_TOKEN_COOKIE_OPTIONS);
  cookies().set("refreshToken", "", REFRESH_TOKEN_COOKIE_OPTIONS);
  cookies().set("isLoggedIn", "false", {
    ...ACCESS_TOKEN_COOKIE_OPTIONS,
    httpOnly: false,
  });
};

// Account
export const updateAccountAction = async (payload: Partial<Account>) => {
  console.log("updateAccountAction");
  const response = await api.updateAccount(payload);
  return response.data;
};

export const verifyAccountAction = async (payload: VerifyAccountRequest) => {
  console.log("verifyAccountAction");
  console.log(payload);
  const response = await api.verifyAccount(payload);
  return response.data;
};

export const resendVerificationCodeAction = async (
  payload: ResendVerificationCodeRequest,
) => {
  console.log("resendVerificationCodeAction");
  const response = await api.resendVerificationCode(payload);

  return response.data;
};

export const getAccountDetailsAction = async () => {
  console.log("getAccountDetailsAction");
  const response = await api.getAccountDetailsDetails();
  console.log(response.data);
  return response.data;
};

export const updateAccountDetailsAction = async (
  payload: Partial<AccountDetails>,
) => {
  console.log("updateAccountDetailsAction");

  const response = await api.updateAccountDetails(payload);
  return response.data;
};

// Profile
export const getCurrentProfileAction = async () => {
  console.log("getCurrentProfileAction");
  const response = await api.getCurrentProfile();

  return response.data;
};

export const updateProfileAction = async (payload: Partial<Profile>) => {
  console.log("updateProfileAction");
  if (payload.avatarUrl) {
    const url = await uploadAvatar(payload.avatarUrl, payload.id);
    payload.avatarUrl = url;
  }
  const response = await api.updateProfile(payload);
  return response.data;
};

export const getProfileDetailsAction = async () => {
  console.log("getProfileDetailsAction");
  const response = await api.getProfileDetails();
  return response.data;
};

export const updateProfileDetailsAction = async (
  payload: Partial<ProfileDetails & Pick<Profile, "avatarUrl">>,
) => {
  console.log("updateProfileDetailsAction");
  if (payload.avatarUrl) {
    const url = await uploadAvatar(payload.avatarUrl, payload.id);
    payload.avatarUrl = url;
  }

  const response = await api.updateProfileDetails(payload);
  return response.data;
};

export const createRoleAction = async (payload: Partial<Role>) => {
  console.log("createRoleAction");
  if (payload.avatarUrl) {
    const url = await uploadAvatar(
      payload.avatarUrl,
      `${payload.profileId}_${payload.role}`,
    );
    payload.avatarUrl = url;
  }
  const response = await api.createRole(payload);
  return response.data;
};
