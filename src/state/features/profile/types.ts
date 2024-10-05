import { Organization, RoleType } from "~/lib/services/cerberus";

export const RoleTypeEnum = {
  OWNER: "owner",
  ADMIN: "admin",
  WRITE: "write",
  READ_ONLY: "read_only",
};

export interface Role {
  id: number;
  role: RoleType;
  organizationId: string;
  organization?: Organization;
  createdAt: string;
  updatedAt?: string | null;
}

export interface Profile {
  id: string | null;
  name: string | null;
  lastname: string | null;
  avatarUrl?: string | null;
  account: string | null;
  createdAt: string | null;
  updatedAt?: string | null;
}

export interface ProfileState {
  currentProfile: Profile;
  roles: Role[] | [];
  selectedRole: Role["id"] | Profile["id"] | null;
  isLoading: boolean;
}

export enum ProfileActionTypes {
  FETCH_CURRENT_PROFILE = "profile/fetchCurrentProfile",
  UPDATE_AVATAR = "profile/updateAvatar",
}
