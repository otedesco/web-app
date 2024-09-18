import { z } from "zod";

export const signUpStepValidator = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirmation"],
      });
    }
  });

export type SignUpStepForm = z.infer<typeof signUpStepValidator>;

export const personalInfoStepValidator = z.object({
  name: z.string().min(2),
  lastname: z.string().min(2),
});

export type PersonalInfoStepForm = z.infer<typeof personalInfoStepValidator>;

export const verifyAccountStepValidator = z.object({
  otp: z.string().min(6),
});

export type VerifyAccountStepForm = z.infer<typeof verifyAccountStepValidator>;

export const signInStepValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInStepForm = z.infer<typeof signInStepValidator>;
