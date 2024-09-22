"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { CardFooter } from "~/components/ui/card";
import AuthCardHeader from "./components/auth-card-header";
import AuthCardBody from "./components/auth-card-body";

import { type TabsEnum, type StepType, StepsByTab } from "./types";
import { AuthContext } from "./context";

export type AuthPageProps = { tab: TabsEnum };

const AuthView = ({ tab }: AuthPageProps) => {
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(tab);
  const [step, setStep] = useState<StepType>(StepsByTab[tab][0]);
  const [formState, setFormState] = useState<Record<string, any>>({});

  const router = useRouter();

  const t = useTranslations("views->auth-view");

  const handleTabChange = useCallback((value: string) => {
    const newTab = value as TabsEnum;
    setSelectedTab(newTab);
    setStep(StepsByTab[newTab][0]);
  }, []);

  const setNextStep = useCallback(() => {
    const nextStep = StepsByTab[selectedTab][step + 1];
    if (nextStep !== undefined) {
      setStep(nextStep);
    } else {
      setFormState({});
      router.push("/");
      router.refresh();
    }
  }, [router, selectedTab, step]);

  const handleSubmit = useCallback(
    (values: Record<string, any>) => {
      setFormState((prevState) => ({ ...prevState, ...values }));
      setNextStep();
    },
    [setNextStep],
  );

  const providerValue = useMemo(
    () => ({ selectedTab, step, formState }),
    [selectedTab, step, formState],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      <AuthCardHeader onStepChange={setStep} />
      <AuthCardBody
        selectedTab={selectedTab}
        onSubmit={handleSubmit}
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
    </AuthContext.Provider>
  );
};

export default AuthView;
