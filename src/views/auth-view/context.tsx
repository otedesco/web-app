import { createContext } from "react";
import { LoginSteps, Tabs, type StepType, type TabsEnum } from "./types";

export const AuthContext = createContext<{
  selectedTab: TabsEnum;
  step: StepType;
}>({ selectedTab: Tabs.LOGIN, step: LoginSteps.LOGIN_FORM });
