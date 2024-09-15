import { useMutation } from "@tanstack/react-query";
import { signUp, type SignUpRequest } from "~/lib/api/auth";
import { type MutationConfig } from "../../types/react-query";
import React from "react";

const mutationFn = async (payload: SignUpRequest) => {
  return signUp(payload);
};

export const useAuth = ({
  onError,
  onMutate,
  onSuccess,
  onSettled,
}: MutationConfig<void, unknown, SignUpRequest>) => {
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
      return mutate({ ...args } as SignUpRequest);
    },
    [mutate],
  );

  const signUpAsync = React.useCallback(
    (args?: SignUpRequest) => {
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
