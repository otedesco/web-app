import { AUTH_SERVER_API } from "~/config/constants";

export interface SignUpRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  lastname: string;
}

export const signUp = async (payload: SignUpRequest): Promise<void> => {
  const res = await fetch(`${AUTH_SERVER_API}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.status !== 200) {
    throw new Error("Signup failed");
  }
};
