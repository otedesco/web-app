export const Tabs = {
  LOGIN: "login",
  SIGNUP: "signup",
} as const;

export type TabsEnum = (typeof Tabs)[keyof typeof Tabs];

export const LoginSteps = {
  LOGIN_FORM: 0,
  SELECT_PROFILE: 1,
} as const;

export const SignUpSteps = {
  SIGN_UP_FORM: 0,
  PERSONAL_INFO_FORM: 1,
  OTP_FORM: 2,
} as const;

export type LoginStepsType = (typeof LoginStepsArray)[number];
export type SignUpStepsType = (typeof SignUpStepsArray)[number];
export const LoginStepsArray = [
  LoginSteps.LOGIN_FORM,
  LoginSteps.SELECT_PROFILE,
] as const;
export const SignUpStepsArray = [
  SignUpSteps.SIGN_UP_FORM,
  SignUpSteps.PERSONAL_INFO_FORM,
  SignUpSteps.OTP_FORM,
] as const;

export type StepType = LoginStepsType | SignUpStepsType;

export const StepsByTab: Record<
  TabsEnum,
  typeof LoginStepsArray | typeof SignUpStepsArray
> = {
  [Tabs.LOGIN]: LoginStepsArray,
  [Tabs.SIGNUP]: SignUpStepsArray,
};
