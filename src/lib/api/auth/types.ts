export enum AccountStatus {
  EMAIL_VERIFICATION_PENDING = "email_verification_pending",
}

export type Account = {
  created_at: string;
  email: string;
  id: string;
  status: AccountStatus;
  token?: string;
  profiles?: Profile[];
};

export type Profile = {
  account: string;
  created_at: string;
  id: string;
  lastname: string;
  name: string;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  lastname: string;
}

export interface VerifyAccountRequest {
  token: string;
  otp: string;
}

export interface SignUpReponse {
  account: Account;
}
