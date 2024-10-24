import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileActionTypes, ProfileState, Role } from "./types";

import _ from "lodash";
import { getCurrentProfileAction } from "~/lib/cerberus/actions";
import { Profile } from "~/lib/cerberus/types";

const initialState: ProfileState = Object.freeze({
  currentProfile: {
    id: null,
    name: null,
    lastname: null,
    avatarUrl: null,
    account: null,
    createdAt: null,
    updatedAt: null,
    details: null,
  },
  roles: [],
  selectedRole: null,
  isLoading: false,
});

export const fetchCurrentProfile = createAsyncThunk(
  ProfileActionTypes.FETCH_CURRENT_PROFILE,
  () => getCurrentProfileAction(),
);

const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setSelectedRole: (state, action: PayloadAction<Role["id"]>) => {
      state.selectedRole = action.payload;
    },
    updateCurrentProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      state.currentProfile = {
        ...state.currentProfile,
        ..._.pick(action.payload, ["avatarUrl", "name", "lastname"]),
      };
    },
    updateRoles: (state, action: PayloadAction<Role>) => {
      state.roles = [...state.roles, action.payload];
    },
    resetProfileState: (state) => {
      state.currentProfile = initialState.currentProfile;
      state.roles = initialState.roles;
      state.selectedRole = initialState.selectedRole;
      state.isLoading = initialState.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCurrentProfile.fulfilled, (state, { payload }) => {
      const { roles = [], ...profile } = payload;
      state.currentProfile = profile;
      state.roles = roles;
      state.isLoading = false;
      if (roles.length === 1 && roles[0]?.role) {
        state.selectedRole = roles[0].id;
      }
    });
    builder.addCase(fetchCurrentProfile.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export type * from "./types";
export const {
  setSelectedRole,
  resetProfileState,
  updateCurrentProfile,
  updateRoles,
} = userSlice.actions;
export default userSlice.reducer;
