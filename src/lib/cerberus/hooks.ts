import { useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "~/lib/react-query/types";
import {
  AccountDetails,
  Authentication,
  Profile,
  ProfileDetails,
  ResendVerificationCodeRequest,
  ResendVerificationCodeResponse,
  SignInRequest,
  SignUpRequest,
  VerifyAccountRequest,
} from "./types";
import {
  fetchCurrentProfile,
  resetProfileState,
  updateCurrentProfile,
} from "~/state/features/profile";
import { useAppDispatch } from "~/state/hooks";
import { store } from "~/state/store";
import {
  getAccountDetailsAction,
  getProfileDetailsAction,
  resendVerificationCodeAction,
  signInAction,
  signOutAction,
  signUpAction,
  updateAccountAction,
  updateAccountDetailsAction,
  updateProfileAction,
  updateProfileDetailsAction,
  verifyAccountAction,
} from "./actions";
import { createMutationHook, createQueryHook } from "~/lib/react-query/utils";
import { Account } from "./types";

export const useResendVerificationCode = createMutationHook<
  ResendVerificationCodeResponse,
  ResendVerificationCodeRequest
>((values: ResendVerificationCodeRequest) =>
  resendVerificationCodeAction(values),
);

export const useAccount = (
  params: Partial<MutationConfig<unknown, unknown, Partial<Account>>> = {},
) => {
  return createMutationHook<unknown, Partial<Account>>(
    (values: Partial<Account>) => updateAccountAction(values),
  )(params);
};

export const useAccountDetails = (
  params: Partial<
    MutationConfig<AccountDetails, unknown, Partial<AccountDetails> | void>
  > = {},
) => {
  const query = createQueryHook(
    () => getAccountDetailsAction(),
    ["accountDetails"],
    {
      notifyOnChangeProps: ["data"],
    },
  )();
  const mutation = createMutationHook<AccountDetails, Partial<AccountDetails>>(
    (values: Partial<AccountDetails>) => updateAccountDetailsAction(values),
  )(params);

  return { ...mutation, ...query };
};

export const useProfileDetails = (
  params: Partial<
    MutationConfig<
      ProfileDetails,
      unknown,
      Partial<ProfileDetails & Pick<Profile, "avatarUrl">> | void
    >
  > = {},
) => {
  const dispatch = useAppDispatch();
  const { isLoading, ...query } = createQueryHook<ProfileDetails>(
    () => getProfileDetailsAction(),
    ["profileDetails"],
    { notifyOnChangeProps: ["data"] },
  )(params);
  const { isSuccess, isPending, isError, ...mutation } = createMutationHook<
    ProfileDetails,
    Partial<ProfileDetails & Pick<Profile, "avatarUrl">>
  >(
    (values: Partial<ProfileDetails & Pick<Profile, "avatarUrl">>) =>
      updateProfileDetailsAction(values),
    {
      onSuccess: (
        data: ProfileDetails,
        variables: Partial<ProfileDetails & Pick<Profile, "avatarUrl">>,
        context: unknown,
      ) => {
        if (data.avatarUrl) {
          dispatch(updateCurrentProfile({ avatarUrl: data.avatarUrl }));
        }
        params.onSuccess?.(data, variables, context);
      },
    },
  )(params);

  return { ...mutation, ...query, isSuccess, isPending, isError, isLoading };
};

export const useSignOut = (
  params: Partial<MutationConfig<void, unknown, unknown>> = {},
) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return createMutationHook<void>(() => signOutAction(), {
    onSuccess: async () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isLoggedIn");
      dispatch(resetProfileState());
      void store.__persistor?.purge();
      queryClient.removeQueries();
    },
  })(params);
};

export const useSignIn = (
  params: Partial<MutationConfig<Authentication, unknown, SignInRequest>> = {},
) => {
  const dispatch = useAppDispatch();
  return createMutationHook<Authentication, SignInRequest>(
    (values: SignInRequest) => signInAction(values),
    {
      onSuccess: async (
        data: Authentication,
        variables: SignInRequest,
        context: unknown,
      ) => {
        const { accessToken, refreshToken } = data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("isLoggedIn", "true");
        await dispatch(fetchCurrentProfile());
        params.onSuccess?.(data, variables, context);
      },
    },
  )(params);
};

export const useSignUp = (
  params: Partial<MutationConfig<Account, unknown, SignUpRequest>> = {},
) => {
  const { mutate: signIn } = useSignIn();

  return createMutationHook<Account, SignUpRequest>(
    (values: SignUpRequest) => signUpAction(values),
    {
      onSuccess: (data: Account, variables: SignUpRequest, ctx: unknown) => {
        if (data) {
          signIn({
            email: variables.email,
            password: variables.password,
          });
        }
        params.onSuccess?.(data, variables, ctx);
      },
    },
  )(params);
};

export const useUpdateProfile = (
  params: Partial<MutationConfig<Profile, unknown, Partial<Profile>>> = {},
) => {
  const dispatch = useAppDispatch();
  return createMutationHook<Profile, Partial<Profile>>(
    (values: Partial<Profile>) => updateProfileAction(values),
    {
      onSuccess: (data: Profile) => {
        dispatch(updateCurrentProfile(data));
      },
    },
  )(params);
};

export const useVerifyAccount = createMutationHook<void, VerifyAccountRequest>(
  (values: VerifyAccountRequest) => verifyAccountAction(values),
);
