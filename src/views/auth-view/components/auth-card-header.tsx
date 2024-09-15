import { ArrowLeft } from "lucide-react";
import React, { useContext } from "react";
import { Logo } from "~/components/brand-logo";
import {
  Button,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import { AuthContext } from "../context";
import { type StepType, Tabs } from "../types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export interface AuthCardHeaderProps {
  onStepChange: (step: StepType) => void;
}

const descriptions = {
  [Tabs.LOGIN]: ["Sign in to your account", "Select your profile to continue"],
  [Tabs.SIGNUP]: ["Create a new account", "Enter the OTP sent to your email"],
};

const AuthCardHeader: React.FC<AuthCardHeaderProps> = ({ onStepChange }) => {
  const { selectedTab, step } = useContext(AuthContext);
  const t = useTranslations("views->auth-view");
  const router = useRouter();

  const handleBack = () =>
    step === 0 ? router.push("/") : onStepChange((step - 1) as StepType);

  return (
    <>
      <div className="flex items-center justify-between px-6 pt-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Logo />
        <div className="w-8" /> {/* Spacer for centering */}
      </div>
      <CardHeader className="space-y-1 p-4 sm:p-6">
        <CardTitle className="text-center text-xl font-bold sm:text-2xl">
          {t("Welcome")}
        </CardTitle>
        <CardDescription className="text-center text-xs sm:text-sm">
          {t(descriptions[selectedTab][step])}
        </CardDescription>
      </CardHeader>
    </>
  );
};

export default AuthCardHeader;
