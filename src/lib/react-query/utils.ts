import { useCallback } from "react";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { MutationConfig } from "./types";

export type MutationFn<TData = unknown, TVariables = unknown> = (
  variables: TVariables,
) => Promise<TData>;

export const createMutationHook =
  <TData = unknown, TVariables = unknown>(
    mutationFn: MutationFn<TData, TVariables>,
    options: Partial<MutationConfig<TData, unknown, TVariables>> = {},
  ) =>
  (params: Partial<MutationConfig<TData, unknown, TVariables>> = {}) => {
    const mutation = useMutation<TData, unknown, TVariables>({
      ...params,
      mutationFn,
      ...options,
    });

    const mutate = useCallback(
      (args: TVariables) => mutation.mutate(args),
      [mutation],
    );

    const mutateAsync = useCallback(
      (args: TVariables) => mutation.mutateAsync(args),
      [mutation],
    );

    return { ...mutation, mutate, mutateAsync };
  };

export const createQueryHook =
  <TData = unknown, TError = unknown>(
    queryFn: () => Promise<TData>,
    queryKey: string[],
    options: Partial<UseQueryOptions<TData, TError>> = {},
  ) =>
  (params: Partial<MutationConfig<TData, TError>> = {}) => {
    const query = useQuery<TData, TError>({
      queryKey,
      queryFn,
      refetchOnWindowFocus: true,
      retry: false,
      ...options,
      ...params,
    });

    return query;
  };
