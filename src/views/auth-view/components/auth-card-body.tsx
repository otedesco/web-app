import React from "react";
import _ from "lodash";
import { CardContent } from "~/components/ui";
import {
  type StepType,
  type TabsEnum,
  LoginSteps,
  SignUpSteps,
  Tabs,
} from "../types";
import {
  LogInFormStep,
  OTPStep,
  PersonalInfoStep,
  ProfileStep,
  SignUpFormStep,
} from "./steps";
import { AuthTabsContainer } from "./utils";

export interface AuthCardBodyProps {
  selectedTab: TabsEnum;
  step: StepType;
  onTabChange: (value: string) => void;
  onSubmit: (values: Record<string, any>) => void;
}

const AuthCardBody: React.FC<AuthCardBodyProps> = ({
  selectedTab,
  step,
  onTabChange,
  onSubmit,
}) => {
  let Component = (
    <AuthTabsContainer selectedTab={selectedTab} onTabChange={onTabChange}>
      {selectedTab === Tabs.LOGIN ? (
        <LogInFormStep onSubmit={onSubmit} />
      ) : (
        <SignUpFormStep onSubmit={onSubmit} />
      )}
    </AuthTabsContainer>
  );

  if (selectedTab === Tabs.LOGIN && step === LoginSteps.SELECT_PROFILE) {
    Component = <ProfileStep onSubmit={onSubmit} />;
  }

  if (selectedTab === Tabs.SIGNUP && step === SignUpSteps.PERSONAL_INFO_FORM) {
    Component = <PersonalInfoStep onSubmit={onSubmit} />;
  }

  if (selectedTab === Tabs.SIGNUP && step === SignUpSteps.OTP_FORM) {
    Component = <OTPStep onSubmit={onSubmit} />;
  }

  return <CardContent className="my-auto p-4 sm:p-6">{Component}</CardContent>;
};

export default AuthCardBody;
