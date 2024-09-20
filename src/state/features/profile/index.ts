import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileActionTypes, ProfileState, Role } from "./types";
import { getCurrentProfile, Profile } from "~/lib/services/cerberus";

const initialState: ProfileState = Object.freeze({
  currentProfile: {
    id: null,
    name: null,
    lastname: null,
    avatarUrl: null,
    account: null,
    createdAt: null,
    updatedAt: null,
  },
  roles: [],
  selectedRole: null,
  isLoading: false,
});

export const fetchCurrentProfile = createAsyncThunk(
  ProfileActionTypes.FETCH_CURRENT_PROFILE,
  async () => {
    const { data } = await getCurrentProfile();

    return data;
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
export const { setSelectedRole } = userSlice.actions;
export default userSlice.reducer;
