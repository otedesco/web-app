import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileActionTypes, ProfileState, Role } from "./types";
import { Profile } from "~/lib/services/cerberus";
import _ from "lodash";

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
  async () => {
    const response = await fetch("/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get in");
    }

    return response.json() as Promise<Profile>;
  },
);

const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setSelectedRole: (
      state,
      action: PayloadAction<Role["id"] | Profile["id"]>,
    ) => {
      state.selectedRole = action.payload;
    },
    updateCurrentProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      state.currentProfile = {
        ...state.currentProfile,
        ..._.pick(action.payload, ["avatarUrl", "name", "lastname", "account"]),
      };
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
    });
    builder.addCase(fetchCurrentProfile.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export type * from "./types";
export const { setSelectedRole, resetProfileState, updateCurrentProfile } =
  userSlice.actions;
export default userSlice.reducer;
