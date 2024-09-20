export enum AccountStatus {
  EMAIL_VERIFICATION_PENDING = "email_verification_pending",
  VERIFIED = "verified",
}

export enum RoleType {
  OWNER = "owner",
  ADMIN = "admin",
  WRITE = "write",
  READ_ONLY = "read_only",
}

export type ApiReponse<T> = {
  data: T;
};

export type Authentication = {
  access_token: string;
  refresh_token: string;
  account: Account;
};

export type Account = {
  created_at: string;
  email: string;
  id: string;
  status: AccountStatus;
  token?: string;
  profiles?: Profile[];
};

export interface Organization {
  id: string;
  name: string;
  collaborators: Profile[] | Profile["id"][];
  logo_url?: string;
  country: string;

  created_at: string;
  updated_at?: string;
}

export type Role = {
  id: number;
  role: RoleType;
  profile_id: Profile["id"];
  organization_id: Organization["id"];

  created_at: string;
  updated_at?: string;
};

export type Profile = {
  id: string;
  name: string;
  lastname: string;
  avatar_url?: string;

  roles?: Role[];

  account: Account["id"];

  created_at: string;
  updated_at?: string;
};
