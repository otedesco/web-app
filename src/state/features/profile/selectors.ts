import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "~/state/store";

export const selectProfileState = (state: RootState) => state.profile;

export const selectCurrentProfile = createSelector(
  selectProfileState,
  (profileState) => profileState.currentProfile,
);

export const selectFirstName = createSelector(
  selectCurrentProfile,
  (profile) => profile.name?.split(" ")[0],
);

export const selectRoles = createSelector(
  selectProfileState,
  (profileState) => profileState.roles,
);

export const selectIsLoading = createSelector(
  selectProfileState,
  (profileState) => profileState.isLoading,
);

export const selectSelectedRole = createSelector(
  selectProfileState,
  (profileState) => profileState.selectedRole,
);

export const selectFullName = createSelector(
  selectCurrentProfile,
  (profile) => `${profile.name} ${profile.lastname}`,
);

export const selectProfileAvatar = createSelector(
  selectCurrentProfile,
  (profile) => profile.avatarUrl,
);
