// Account related types
export enum AccountStatus {
  EMAIL_VERIFICATION_PENDING = "email_verification_pending",
  VERIFIED = "verified",
}

export type Account = {
  createdAt: string;
  email: string;
  id: string;
  status: AccountStatus;
  token?: string;
  profiles?: Profile[];
  phoneNumber?: string;
};

export type AccountDetails = {
  id: string;
  emailVerificationStatus: VerificationStatusType;
  phoneVerificationStatus: VerificationStatusType;
  identityVerificationStatus: VerificationStatusType;
  legalFirstname?: string;
  legalLastname?: string;
  govermentId?: string | null;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  accountId: Account["id"];
  createdAt: Date;
  updatedAt?: Date | null;
};

// Verification related types
export enum VerificationMethod {
  EMAIL = "email",
  PHONE = "phone",
}

export const VerificationStatusEnum = {
  VERIFICATION_PENDING: "verification_pending",
  VERIFICATION_REQUESTED: "verification_requested",
  VERIFICATION_FAILED: "verification_failed",
  VERIFIED: "verified",
} as const;

export type VerificationStatusType =
  (typeof VerificationStatusEnum)[keyof typeof VerificationStatusEnum];

export interface ResendVerificationCodeRequest {
  method: VerificationMethod;
}

export interface ResendVerificationCodeResponse {
  token: string;
}

export interface VerifyAccountRequest {
  token: string;
  otp: string;
}

// Authentication related types
export type Authentication = {
  accessToken: string;
  refreshToken: string;
};

export interface SignUpRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
  name?: string;
  lastname?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
// Organization related types
export interface Organization {
  id: string;
  name: string;
  collaborators: Profile[] | Profile["id"][];
  logoUrl?: string;
  country: string;
  createdAt: string;
  updatedAt?: string;
}

// Role related types
export enum RoleType {
  // LEGACY ROLE TYPES
  OWNER = "owner",
  ADMIN = "admin",
  WRITE = "write",
  READ_ONLY = "read_only",

  // NEW ROLE TYPES
  BASIC_USER = "basic_user",
  BASIC_AGENT = "individual_agent",
  ORGANIZATION_AGENT = "organization_agent",
  ORGANIZATION_OWNER = "organization_owner",
  ORGANIZATION_ADMIN = "organization_admin",
  ORGANIZATION_WRITE = "organization_write",
  ORGANIZATION_READ_ONLY = "organization_read_only",
}

export type Role = {
  id: string;
  role: RoleType;
  profileId: Profile["id"];
  avatarUrl?: string;
  organizationId: Organization["id"];
  createdAt: string;
  updatedAt?: string;
};

// Profile related types
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
