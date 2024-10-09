import { useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { type MutationConfig } from "~/lib/types/react-query";
import { useAppDispatch } from "~/state/hooks";
import { Profile, ProfileDetails } from "../services/cerberus";
import { updateCurrentProfile } from "~/state/features/profile";

const mutationFn = async (
  payload: Partial<ProfileDetails & Pick<Profile, "avatarUrl">>,
): Promise<ProfileDetails> => {
  const response = await fetch(`/api/profile/details`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile details");
  }

  return response.json() as Promise<ProfileDetails>;
};

const queryFn = async (): Promise<ProfileDetails> => {
  const response = await fetch(`/api/profile/details`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to get profile details");
  }

  return response.json() as Promise<ProfileDetails>;
};

export const useProfileDetails = ({
  onError,
  onMutate,
  onSuccess: _onSuccess,
}: MutationConfig<
  ProfileDetails,
  void,
  Partial<ProfileDetails & Pick<Profile, "avatarUrl">>
>) => {
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(
    (
      data: ProfileDetails,
      variables: Partial<ProfileDetails>,
      ctx: unknown,
    ) => {
      if (data.avatarUrl) {
        dispatch(updateCurrentProfile({ avatarUrl: data.avatarUrl }));
      }

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

  const { data, isLoading } = useQuery({
    queryKey: ["profileDetails"],
    queryFn: queryFn,
    enabled: true,
    refetchOnWindowFocus: true,
  });

  const updateProfileDetailsAsync = useCallback(
    (variables: Partial<ProfileDetails>) => mutateAsync(variables),
    [mutateAsync],
  );
  const updateProfileDetails = useCallback(
    (variables: Partial<ProfileDetails>) => mutate(variables),
    [mutate],
  );

  return {
    ...mutation,
    updateProfileDetails,
    updateProfileDetailsAsync,
    data,
    isLoading,
  };
};
