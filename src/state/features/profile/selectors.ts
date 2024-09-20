import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "~/state/store";

export const selectProfileState = (state: RootState) => state.profile;

export const selectCurrentProfile = createSelector(
  selectProfileState,
  (profileState) => profileState.currentProfile,
);

export const selectRoles = createSelector(
  selectProfileState,
  (profileState) => profileState.roles,
);

export const selectIsLoading = createSelector(
  selectProfileState,
  (profileState) => profileState.isLoading,
);
