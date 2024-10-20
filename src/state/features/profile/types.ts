import { Organization, RoleType } from "~/lib/cerberus/types";

export const RoleTypeEnum = {
  OWNER: "owner",
  ADMIN: "admin",
  WRITE: "write",
  READ_ONLY: "read_only",
};

export interface Role {
  id: string;
  role: RoleType;
  organizationId: string;
  organization?: Organization;
  createdAt: string;
  updatedAt?: string | null;
}

export type ProfileDetails = {
  id: string;
  location?: string;
  school?: string;
  work?: string;
  languages?: string[];
  birthdate?: Date;
  gender?: string;
  maritalStatus?: string;
  nationality?: string;
  about?: string;

  profileId: Profile["id"];

  createdAt: Date;
  updatedAt?: Date | null;
};

export interface Profile {
  id: string | null;
  name: string | null;
  lastname: string | null;
  avatarUrl?: string | null;
  account: string | null;
  createdAt: string | null;
  updatedAt?: string | null;
}

export type Account = {
  id: string;
  email: string;
  password: string;
  salt: string;
  active: boolean;
  detailsId?: string;
  phoneNumber?: string;
  profile?: Profile;

  createdAt: string;
  updatedAt?: string;
};

export interface ProfileState {
  currentProfile: Profile;
  roles: Role[] | [];
  selectedRole: Role["id"] | null;
  isLoading: boolean;
}

export enum ProfileActionTypes {
  FETCH_CURRENT_PROFILE = "profile/fetchCurrentProfile",
  UPDATE_AVATAR = "profile/updateAvatar",
}
