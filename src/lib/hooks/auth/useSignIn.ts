import { useMutation } from "@tanstack/react-query";

import { type MutationConfig } from "../../types/react-query";
import React from "react";
import { signIn } from "~/lib/api/auth";
import { LoginRequest } from "~/lib/api/auth/types";

const mutationFn = async (payload: LoginRequest) => {
  return signIn(payload);
};

export const useSignIn = ({
  onError,
  onMutate,
  onSuccess,
  onSettled,
}: MutationConfig<void, unknown, LoginRequest>) => {
  const {
    data,
    error,
    isError,
    isIdle,
    isPending,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = useMutation({
    mutationFn,
    onError,
    onMutate,
    onSuccess,
    onSettled,
  });

  const signIn = React.useCallback(
    (args?: LoginRequest) => {
      return mutate({ ...args } as LoginRequest);
    },
    [mutate],
  );

  const signInAsync = React.useCallback(
    async (args: LoginRequest) => {
      try {
        const res = await mutateAsync({ ...args } as LoginRequest);

        // TODO: dispatch set profile data on redux when success
        return res;
      } catch (error) {
        throw error;
      }
    },
    [mutateAsync],
  );

  return {
    data,
    error,
    isError,
    isIdle,
    isPending,
    isSuccess,
    signIn,
    signInAsync,
    reset,
    status,
    variables,
  };
};
