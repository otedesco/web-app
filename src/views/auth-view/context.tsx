import { createContext } from "react";
import { LoginSteps, Tabs, type StepType, type TabsEnum } from "./types";
import { SignUpRequest } from "~/lib/api/auth/types";

export const AuthContext = createContext<{
  selectedTab: TabsEnum;
  step: StepType;
  formState: Record<string, any>;
}>({ selectedTab: Tabs.LOGIN, step: LoginSteps.LOGIN_FORM, formState: {} });
