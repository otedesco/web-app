import { useMutation, useQuery } from "@tanstack/react-query";
import { AccountDetails } from "../services/cerberus";
import { MutationConfig } from "../types/react-query";
import { useCallback } from "react";

const mutationFn = async (
  payload: Partial<AccountDetails>,
): Promise<AccountDetails> => {
  const response = await fetch(`/api/account/details`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile details");
  }

  return response.json() as Promise<AccountDetails>;
};

const queryFn = async (): Promise<AccountDetails> => {
  const response = await fetch(`/api/account/details`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to get profile details");
  }

  return response.json() as Promise<AccountDetails>;
};

export const useAccountDetails = ({
  onError,
  onMutate,
  onSuccess,
}: MutationConfig<AccountDetails, void, Partial<AccountDetails>>) => {
  const { data, isLoading, ...query } = useQuery({
    queryKey: ["accountDetails"],
    queryFn: queryFn,
    refetchOnWindowFocus: true,
    retry: false,
    notifyOnChangeProps: ["data"],
  });

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn,
    onError,
    onMutate,
    onSuccess,
  });

  const updateAccountDetailsAsync = useCallback(
    (variables: Partial<AccountDetails>) => mutateAsync(variables),
    [mutateAsync],
  );
  const updateAccountDetails = useCallback(
    (variables: Partial<AccountDetails>) => mutate(variables),
    [mutate],
  );

  return {
    ...mutation,
    ...query,
    data,
    isLoading,
    updateAccountDetails,
    updateAccountDetailsAsync,
  };
};
