import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "~/lib/types/react-query";
import { Authentication, SignInRequest } from "~/lib/services/cerberus";
import { useAppDispatch } from "~/state/store";
import { fetchCurrentProfile, setSelectedRole } from "~/state/features/profile";
import { selectRoles } from "~/state/features/profile/selectors";
import { useAppSelector } from "~/state/hooks";
import { useRouter } from "next/navigation";

const mutationFn = async (payload: SignInRequest): Promise<Authentication> => {
  const response = await fetch("/api/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to sign in");
  }

  return response.json() as Promise<Authentication>;
};

export const useSignIn = ({
  onError,
  onMutate,
  onSuccess: _onSuccess,
}: MutationConfig<Authentication, unknown, SignInRequest>) => {
  const dispatch = useAppDispatch();
  const roles = useAppSelector(selectRoles);

  const onSuccess = useCallback(
    async (data: Authentication, variables: SignInRequest, ctx: unknown) => {
      const { accessToken, refreshToken } = data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("isLoggedIn", "true");

      await dispatch(fetchCurrentProfile());

      return _onSuccess?.(data, variables, ctx);
    },
    [_onSuccess, dispatch, roles],
  );

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn,
    onError,
    onMutate,
    onSuccess,
  });

  const signIn = useCallback((args: SignInRequest) => mutate(args), [mutate]);

  const signInAsync = useCallback(
    (args: SignInRequest) => mutateAsync(args),
    [mutateAsync],
  );

  return { ...mutation, signIn, signInAsync };
};
