import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { type MutationConfig } from "~/lib/types/react-query";
import { useAppDispatch } from "~/state/hooks";
import { Profile } from "../services/cerberus";
import { updateCurrentProfile } from "~/state/features/profile";

const mutationFn = async (payload: Partial<Profile>): Promise<Profile> => {
  const response = await fetch(`/api/profile`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json() as Promise<Profile>;
};

export const useUpdateProfile = ({
  onError,
  onMutate,
  onSuccess: _onSuccess,
}: MutationConfig<Profile, void, Partial<Profile>>) => {
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(
    (data: Profile, variables: Partial<Profile>, ctx: unknown) => {
      dispatch(updateCurrentProfile(data));
      return _onSuccess?.(data, variables, ctx);
    },
    [_onSuccess, dispatch],
  );

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn,
    onError,
    onMutate,
    onSuccess,
  });

  const updateProfileAsync = useCallback(
    (variables: Partial<Profile>) => mutateAsync(variables),
    [mutateAsync],
  );
  const updateProfile = useCallback(
    (variables: Partial<Profile>) => mutate(variables),
    [mutate],
  );

  return { ...mutation, updateProfile, updateProfileAsync };
};
