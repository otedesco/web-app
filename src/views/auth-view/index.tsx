"use client";

import { useMemo, useState } from "react";

import { Card, CardFooter } from "~/components/ui/card";
import AuthCardHeader from "./components/auth-card-header";
import AuthCardBody from "./components/auth-card-body";

import { type TabsEnum, type StepType, StepsByTab } from "./types";
import { AuthContext } from "./context";
import { useTranslations } from "next-intl";

export type AuthPageProps = { tab: TabsEnum };

const AuthView = ({ tab }: AuthPageProps) => {
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(tab);
  const [step, setStep] = useState<StepType>(StepsByTab[tab][0]);
  const t = useTranslations("views->auth-view");

  const handleTabChange = (value: string) => {
    const selectedTab = value as TabsEnum;
    setSelectedTab(selectedTab);

    setStep(StepsByTab[selectedTab][0]);
  };

  const providerValue = useMemo(
    () => ({ selectedTab, step }),
    [selectedTab, step],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-2 sm:p-4">
        <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-br from-primary/20 via-background to-secondary/20">
          <div className="bg-[url('data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><g fill-opacity=%22.1%22><circle r=%2220%22 cx=%2221%22 cy=%2220%22 /><circle r=%2245%22 cx=%2270%22 cy=%2270%22 /><circle r=%2230%22 cx=%2250%22 cy=%2250%22 /></g></svg>')] absolute inset-0 animate-subtle-drift bg-[length:100px_100px]"></div>
        </div>
        <Card className="z-10 w-full max-w-[95%] overflow-hidden sm:max-w-md">
          <AuthCardHeader onStepChange={setStep} />
          <AuthCardBody
            selectedTab={selectedTab}
            step={step}
            onTabChange={handleTabChange}
          />
          <CardFooter className="flex justify-center p-4 sm:p-6">
            <p className="text-center text-[10px] text-muted-foreground sm:text-xs">
              {t(
                "By continuing, you agree to our Terms of Service and Privacy Policy",
              )}
            </p>
          </CardFooter>
        </Card>
      </div>
    </AuthContext.Provider>
  );
};

export default AuthView;
