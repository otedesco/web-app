import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import _ from "lodash";

import {
  CardContent,
  Tabs as TabsContainer,
  TabsList,
  TabsTrigger,
} from "~/components/ui";

import { LoginSteps, SignUpSteps, StepType, Tabs, TabsEnum } from "../types";
import { LogInFormStep, OTPStep, ProfileStep, SignUpFormStep } from "./steps";
import { AuthTabsContainer } from "./utils";

export interface AuthCardBodyProps {
  selectedTab: TabsEnum;
  step: StepType;
  onTabChange: (value: string) => void;
}

const AuthCardBody: React.FC<AuthCardBodyProps> = ({
  selectedTab,
  step,
  onTabChange,
}) => {
  let Component = (
    <AuthTabsContainer selectedTab={selectedTab} onTabChange={onTabChange}>
      {selectedTab === Tabs.LOGIN ? <LogInFormStep /> : <SignUpFormStep />}
    </AuthTabsContainer>
  );

  if (selectedTab === Tabs.LOGIN && step === LoginSteps.SELECT_PROFILE) {
    Component = <ProfileStep />;
  }
  if (selectedTab === Tabs.SIGNUP && step === SignUpSteps.OTP_FORM) {
    Component = <OTPStep />;
  }

  return <CardContent className="p-4 sm:p-6">{Component}</CardContent>;
};

export default AuthCardBody;
