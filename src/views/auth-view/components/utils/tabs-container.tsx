import React, { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Tabs as TabsContainer, TabsList, TabsTrigger } from "~/components/ui";
import { Tabs, type TabsEnum } from "../../types";
import { useTranslations } from "next-intl";

export interface AuthTabsContainerProps {
  selectedTab: TabsEnum;
  onTabChange: (value: string) => void;
}

const AuthTabsContainer: React.FC<
  React.PropsWithChildren<AuthTabsContainerProps>
> = (props) => {
  const t = useTranslations("views->auth-view");
  return (
    <TabsContainer
      value={props.selectedTab}
      onValueChange={props.onTabChange}
      className="w-full"
    >
      <TabsList className="mb-4 grid w-full grid-cols-2">
        <TabsTrigger value={Tabs.LOGIN}>{t("Log In")}</TabsTrigger>
        <TabsTrigger value={Tabs.SIGNUP}>{t("Sign Up")}</TabsTrigger>
      </TabsList>
      <div className="relative h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={props.selectedTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            {props.children}
          </motion.div>
        </AnimatePresence>
      </div>
    </TabsContainer>
  );
};

export default memo(AuthTabsContainer);
