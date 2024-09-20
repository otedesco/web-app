import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { MutationConfig } from "~/lib/types/react-query";
import { Authentication, SignInRequest, signIn } from "~/lib/services/cerberus";

const mutationFn = async (payload: SignInRequest): Promise<Authentication> => {
  const { data } = await signIn(payload);

  return data;
};

export const useSignIn = ({
  onError,
  onMutate,
  onSuccess: _onSuccess,
}: MutationConfig<Authentication, unknown, SignInRequest>) => {
  const onSuccess = useCallback(
    (data: Authentication, variables: SignInRequest, ctx: unknown) => {
      const { access_token, refresh_token } = data;
      if (data) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
      }

      return _onSuccess?.(data, variables, ctx);
    },
    [_onSuccess],
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
