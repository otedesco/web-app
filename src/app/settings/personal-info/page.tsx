"use client";

import { domAnimation, m, motion } from "framer-motion";
import { Lock, ShieldCheck, View } from "lucide-react";
import { PropsWithChildren, useCallback, useState } from "react";
import {
  LazyAnimatePresence,
  LazyAnimatePresenceWithMotion,
} from "~/components/motion";
import MobileTopNavBar from "~/components/navigation-menu/mobile-top-navigation-bar";
import { Card } from "~/components/ui";
import { Separator } from "~/components/ui/separator";
import { useAccountDetails } from "~/lib/hooks/useAccountDetails";
import * as LegalName from "./components/LegalName";
import * as GovermentId from "./components/GovermentId";
import * as EmailAddress from "./components/EmailAddress";
import * as PhoneNumber from "./components/PhoneNumber";
import * as Address from "./components/Address";
import * as EmergencyContact from "./components/EmergencyContact";
import { cn } from "~/lib/utils";
import { Fields } from "./types";
import { useTranslations } from "next-intl";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mb-10 flex min-h-[calc(100vh-6rem)] min-w-full flex-col place-items-center pt-16 md:pt-8">
      {children}
    </div>
  );
};

const Heading: React.FC = () => {
  return (
    <div className="mb-4 mr-auto flex flex-col md:mb-10">
      <h2 className="text-2xl font-bold md:text-4xl">Personal Info</h2>
    </div>
  );
};

const Items = [
  LegalName,
  GovermentId,
  EmailAddress,
  PhoneNumber,
  Address,
  EmergencyContact,
];

const AccountPersonalInfo: React.FC = () => {
  const { data, isLoading, refetch } = useAccountDetails({});

  const handleSubmit = useCallback(() => {
    setIsItemExpanded(null);

    return refetch();
  }, [refetch]);

  const [isItemExpanded, setIsItemExpanded] = useState<Fields | null>(null);

  const RenderItem = ({
    Trigger,
    Value,
    Component,
    key,
  }: (typeof Items)[number]) => {
    const t = useTranslations("views->personal-info-view");

    return (
      <motion.div
        layout="preserve-aspect"
        transition={{ type: "tween", ease: "easeInOut" }}
        key={key}
        className={cn(
          "flex items-start border-b py-6 last:border-b-0",
          isItemExpanded !== null && isItemExpanded === key && "z-20",
        )}
      >
        <div className="flex flex-col">
          <h3 className="font-medium">{t(`items.${key}.label`)}</h3>
          {isItemExpanded !== key && (
            <LazyAnimatePresenceWithMotion features={domAnimation}>
              <Value data={data} isLoading={isLoading} />
            </LazyAnimatePresenceWithMotion>
          )}
          {isItemExpanded === key && (
            <LazyAnimatePresenceWithMotion features={domAnimation}>
              <Component
                data={data}
                isLoading={isLoading}
                onSubmit={handleSubmit}
              />
            </LazyAnimatePresenceWithMotion>
          )}
        </div>
        <Trigger
          data={data}
          onClick={setIsItemExpanded}
          onSubmit={handleSubmit}
          isOpen={isItemExpanded === key}
        />
      </motion.div>
    );
  };

  return (
    <div className="relative mr-auto flex w-full max-w-2xl flex-col gap-4">
      <LazyAnimatePresence features={domAnimation}>
        {isItemExpanded !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsItemExpanded(null)}
            className={cn(
              "absolute inset-0 z-10 flex items-center justify-center bg-background/80",
            )}
          />
        )}
      </LazyAnimatePresence>

      {Items.map(RenderItem)}
    </div>
  );
};

const NoticeCard: React.FC = () => {
  return (
    <Card className="ml-20 hidden max-h-max w-6/12 flex-col p-6 md:flex">
      <ShieldCheck className="text-brand-primary" size={48} />
      <h3 className="mt-4 text-xl font-semibold">
        Why isn’t my info shown here?
      </h3>
      <p className="mt-4 text-muted-foreground">
        We’re hiding some account details to protect your identity.
      </p>
      <Separator className="my-8" />
      <Lock className="text-brand-primary" size={48} />
      <h3 className="mt-4 text-xl font-semibold">
        Which details can be edited?
      </h3>
      <p className="mt-4 text-muted-foreground">
        Contact info and personal details can be edited. If this info was used
        to verify your identity, you’ll need to get verified again the next time
        you book—or to continue hosting.
      </p>
      <Separator className="my-8" />
      <View className="text-brand-primary" size={48} />
      <h3 className="mt-4 text-xl font-semibold">
        What info is shared with others?
      </h3>
      <p className="mt-4 text-muted-foreground">
        Apart only releases contact information for Users after a reservation is
        confirmed.
      </p>
    </Card>
  );
};

const SettingsPersonalInfoPage: React.FC = () => {
  return [
    <MobileTopNavBar key="mobile-top-nav-bar" showRightComponent={false} />,
    <Container key="container">
      <Heading />

      <div className="flex w-full flex-row">
        <AccountPersonalInfo />
        <NoticeCard />
      </div>
    </Container>,
  ];
};

export default SettingsPersonalInfoPage;
