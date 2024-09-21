import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { SignUpRequest } from "~/lib/services/cerberus";
import { type MutationConfig } from "~/lib/types/react-query";

import { useSignIn } from "./useSignIn";

const mutationFn = async (payload: SignUpRequest) => {
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

  return;
};

export const useSignUp = ({
  onError,
  onMutate,
  onSuccess: _onSuccess,
}: MutationConfig<void, unknown, SignUpRequest>) => {
  const { signIn } = useSignIn({});

  const onSuccess = useCallback(
    (data: void, variables: SignUpRequest, ctx: unknown) => {
      signIn({
        email: variables.email,
        password: variables.password,
      });

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
