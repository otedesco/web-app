import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { VerifyAccountRequest, verifyAccount } from "~/lib/services/cerberus";
import { MutationConfig } from "~/lib/types/react-query";

const mutationFn = async (payload: VerifyAccountRequest) =>
  verifyAccount(payload);

export const useVerifyAccount = ({
  onError,
  onMutate,
  onSuccess,
  onSettled,
}: MutationConfig<void, unknown, VerifyAccountRequest>) => {
  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn,
    onError,
    onMutate,
    onSuccess,
    onSettled,
  });

  const verifyAccount = useCallback(
    (args?: VerifyAccountRequest) => mutate(args!),
    [mutate],
  );

  const verifyAccountAsync = useCallback(
    (args: VerifyAccountRequest) => mutateAsync(args),
    [mutateAsync],
  );

  return { ...mutation, verifyAccount, verifyAccountAsync };
};