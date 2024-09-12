import {
  createSlice,
  type Dispatch,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { RoleTypeEnum, type UserState } from "./types";

const initialState: UserState = Object.freeze({
  profile: {
    id: null,
    name: null,
    lastname: null,
    avatarUrl: null,
    account: null,
    roles: [],
    createdAt: null,
  },
  roles: [],
  selectedRole: null,
});

export function getUser() {
  return async (dispatch: Dispatch) => {
    try {
      const data = {
        profile: {
          id: "user123",
          name: "John",
          lastname: "Doe",
          avatarUrl: "https://example.com/avatar.jpg",
          account: "john.doe@example.com",
          roles: ["owner", "read_only"],
          createdAt: "2023-01-15T08:00:00Z",
        },
        roles: [
          {
            id: 1,
            role: RoleTypeEnum.OWNER,
            profileId: "user123",
            organizationId: "org1",
            createdAt: "2023-01-15T08:00:00Z",
            updatedAt: "2023-03-01T09:00:00Z",
          },
          {
            id: 2,
            role: RoleTypeEnum.READ_ONLY,
            profileId: "user123",
            organizationId: "org1",
            createdAt: "2023-02-01T08:00:00Z",
          },
        ],
        selectedRole: 1,
      };
      // Make an HTTP GET request to the API
      //   const response = await fetch("https://www.boredapi.com/api/activity");

      // Extract card resources from the API response

      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(getUserSuccess(data));
    } catch (error) {
      console.error("Error fetching card resources:", error);
    }
  };
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserSuccess(state, action: PayloadAction<UserState>) {
      state = { ...state, ...action.payload };
    },
  },
});

export const { getUserSuccess } = userSlice.actions;
export default userSlice.reducer;
