import { useMutation } from "@tanstack/react-query";

import { type MutationConfig } from "../../types/react-query";
import React from "react";
import { signUp } from "~/lib/api/auth";
import type { SignUpResponse, SignUpRequest } from "~/lib/api/auth/types";

const mutationFn = async (payload: SignUpRequest) => {
  return signUp(payload);
};

export const useSignUp = ({
  onError,
  onMutate,
  onSuccess,
  onSettled,
}: MutationConfig<SignUpResponse, unknown, SignUpRequest>) => {
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

  const signUp = React.useCallback(
    (args?: SignUpRequest) => {
      // TODO: login user after suceessful sign up
      return mutate({ ...args } as SignUpRequest);
    },
    [mutate],
  );

  const signUpAsync = React.useCallback(
    async (args: SignUpRequest) => {
      // TODO: login user after suceessful sign up
      // TODO: dispatch set profile data on redux when success
      return mutateAsync({ ...args } as SignUpRequest);
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
    signUp,
    signUpAsync,
    reset,
    status,
    variables,
  };
};
