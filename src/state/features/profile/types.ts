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
  organization_id: string;
  organization?: Organization;
  created_at: string;
  updated_at?: string | null;
}

export interface Profile {
  id: string | null;
  name: string | null;
  lastname: string | null;
  avatar_url?: string | null;
  account: string | null;
  created_at: string | null;
  updated_at?: string | null;
}

export interface ProfileState {
  currentProfile: Profile;
  roles: Role[] | [];
  selected_role: Role["id"] | Profile["id"] | null;
  isLoading: boolean;
}

export enum ProfileActionTypes {
  FETCH_CURRENT_PROFILE = "profile/fetchCurrentProfile",
}
