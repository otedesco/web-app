import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { SignUpRequest, Account } from "~/lib/services/cerberus";
import { type MutationConfig } from "~/lib/types/react-query";

import { useSignIn } from "./useSignIn";

const mutationFn = async (payload: SignUpRequest): Promise<Account> => {
  const response = await fetch("/api/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to sign up");
  }

  return response.json() as Promise<Account>;
};

// const mutationFn = async (payload: SignUpRequest) => {
//   const { data } = await signUp(payload);
//   return data;
// };

export const useSignUp = ({
  onError,
  onMutate,
  onSuccess: _onSuccess,
}: MutationConfig<Account, unknown, SignUpRequest>) => {
  const { signIn } = useSignIn({});

  const onSuccess = useCallback(
    (data: Account, variables: SignUpRequest, ctx: unknown) => {
      if (data) {
        signIn({
          email: variables.email,
          password: variables.password,
        });
      }

      return _onSuccess?.(data, variables, ctx);
    },
    [_onSuccess, signIn],
  );

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn,
    onError,
    onMutate,
    onSuccess,
  });

  const signUpAsync = useCallback(
    (args: SignUpRequest) => mutateAsync(args),
    [mutateAsync],
  );
  const signUp = useCallback((args?: SignUpRequest) => mutate(args!), [mutate]);

  return { ...mutation, signUp, signUpAsync };
};
