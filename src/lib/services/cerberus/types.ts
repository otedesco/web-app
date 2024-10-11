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

export const VerificationStatusEnum = {
  VERIFICATION_PENDING: "verification_pending",
  VERIFICATION_REQUESTED: "verification_requested",
  VERIFICATION_FAILED: "verification_failed",
  VERIFIED: "verified",
} as const;

export type VerificationStatusType =
  (typeof VerificationStatusEnum)[keyof typeof VerificationStatusEnum];

export type ApiReponse<T> = {
  data: T;
};

export type Authentication = {
  accessToken: string;
  refreshToken: string;
};

export type Account = {
  createdAt: string;
  email: string;
  id: string;
  status: AccountStatus;
  token?: string;
  profiles?: Profile[];
};

export type AccountDetails = {
  id: string;
  emailVerificationStatus: VerificationStatusType;
  phoneVerificationStatus: VerificationStatusType;
  identityVerificationStatus: VerificationStatusType;
  legalFirstname?: string;
  legalLastname?: string;
  govermentId?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;

  accountId: Account["id"];

  createdAt: Date;
  updatedAt?: Date | null;
};

export interface Organization {
  id: string;
  name: string;
  collaborators: Profile[] | Profile["id"][];
  logoUrl?: string;
  country: string;

  createdAt: string;
  updatedAt?: string;
}

export type Role = {
  id: number;
  role: RoleType;
  profileId: Profile["id"];
  organizationId: Organization["id"];

  createdAt: string;
  updatedAt?: string;
};

export type Profile = {
  id: string;
  name: string;
  lastname: string;
  avatarUrl?: string;

  roles?: Role[];

  account: Account["id"];

  createdAt: string;
  updatedAt?: string;
};

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
  avatarUrl?: string;

  profileId: Profile["id"];

  createdAt: Date;
  updatedAt?: Date | null;
};
