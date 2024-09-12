export const RoleTypeEnum = {
  OWNER: "owner",
  ADMIN: "admin",
  WRITE: "write",
  READ_ONLY: "read_only",
};

export interface Role {
  id: number;
  role: (typeof RoleTypeEnum)[keyof typeof RoleTypeEnum];
  profileId: Profile["id"];
  organizationId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Profile {
  id: string | null;
  name: string | null;
  lastname: string | null;
  avatarUrl: string | null;
  account: string | null;
  roles: string[] | [];
  createdAt: string | null;
}

export interface UserState {
  profile: Profile | null;
  roles: Role[] | [];
  selectedRole: Role["id"] | null;
}
