import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { type MutationConfig } from "~/lib/types/react-query";
import { useAppDispatch } from "~/state/hooks";
import { resetProfileState } from "~/state/features/profile";

const mutationFn = async (): Promise<void> => {
  const response = await fetch("/api/sign-out", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to sign up");
  }
};

export const useSignOut = ({
  onError,
  onMutate,
  onSuccess: _onSuccess,
}: MutationConfig<void, unknown>) => {
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(
    (data: void, variables: undefined, ctx: unknown) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isLoggedIn");
      dispatch(resetProfileState());

      return _onSuccess?.(data, variables, ctx);
    },
    [_onSuccess, dispatch],
  );

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn,
    onError,
    onMutate,
    onSuccess,
  });

  const signOutAsync = useCallback(
    (variables: undefined) => mutateAsync(variables),
    [mutateAsync],
  );
  const signOut = useCallback(
    (variables: undefined) => mutate(variables),
    [mutate],
  );

  return { ...mutation, signOut, signOutAsync };
};
