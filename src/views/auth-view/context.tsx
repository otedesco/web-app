import { createContext } from "react";
import { LoginSteps, Tabs, type StepType, type TabsEnum } from "./types";

export type FormState = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  lastname: string;
  token: string;
  otp: string;
  [key: string]: any;
};

export const AuthContext = createContext<{
  selectedTab: TabsEnum;
  step: StepType;
  formState: Partial<FormState>;
}>({ selectedTab: Tabs.LOGIN, step: LoginSteps.LOGIN_FORM, formState: {} });
