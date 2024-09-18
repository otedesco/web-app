import { useMutation } from "@tanstack/react-query";

import { type MutationConfig } from "../../types/react-query";
import React from "react";
// import { signUp, verifyAccount } from "~/lib/api/auth";
import {
  SignUpReponse,
  SignUpRequest,
  VerifyAccountRequest,
} from "~/lib/api/auth/types";
import { verifyAccount } from "~/lib/api/auth";

const mutationFn = async (payload: VerifyAccountRequest) => {
  return verifyAccount(payload);
};

export const useVerifyAccount = ({
  onError,
  onMutate,
  onSuccess,
  onSettled,
}: MutationConfig<void, unknown, VerifyAccountRequest>) => {
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

  const verifyAccount = React.useCallback(
    (args?: VerifyAccountRequest) => {
      // TODO: login user after verify account
      return mutate({ ...args } as VerifyAccountRequest);
    },
    [mutate],
  );

  const verifyAccountAsync = React.useCallback(
    async (args: VerifyAccountRequest) => {
      try {
        // TODO: login user after verify account
        const res = await mutateAsync({ ...args } as VerifyAccountRequest);
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
    verifyAccount,
    verifyAccountAsync,
    reset,
    status,
    variables,
  };
};
