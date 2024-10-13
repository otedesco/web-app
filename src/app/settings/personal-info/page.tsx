"use client";

import { domAnimation, m, motion } from "framer-motion";
import { Lock, ShieldCheck, View } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { ControlledTextInput } from "~/components/inputs";
import { LazyAnimatePresence } from "~/components/motion";
import MobileTopNavBar from "~/components/navigation-menu/mobile-top-navigation-bar";
import { Button, Card } from "~/components/ui";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

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

const AccountPersonalInfo: React.FC = () => {
  const [isItemExpanded, setIsItemExpanded] = useState<number | null>(null);
  const items = [
    { id: 1, label: "Legal name", value: "Oswaldo Tedesco" },
    { id: 2, label: "Prefered name", value: "Not provided" },
    { id: 3, label: "Email Address", value: "o***1@live.com" },
    { id: 4, label: "Phone Number", value: "+54 * ** ****-5451" },
    { id: 5, label: "Address", value: "Not provided" },
    { id: 6, label: "Emergency Contact", value: "Not provided" },
  ];

  const RenderItem = ({
    id,
    label,
    value,
  }: {
    id: number;
    label: string;
    value: string;
  }) => {
    return (
      <motion.div
        layout="preserve-aspect"
        transition={{ ease: "easeInOut" }}
        key={label}
        className={cn(
          "flex items-start border-b py-6 last:border-b-0",
          isItemExpanded !== null && isItemExpanded === id && "z-20",
        )}
      >
        <div className="flex flex-col">
          <h3 className="font-medium">{label}</h3>
          {isItemExpanded !== id && (
            <LazyAnimatePresence features={domAnimation}>
              <m.span
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-muted-foreground"
              >
                {value}
              </m.span>
            </LazyAnimatePresence>
            // <span className="text-muted-foreground">{value}</span>
          )}
          {isItemExpanded === id && (
            <LazyAnimatePresence features={domAnimation}>
              <m.div
                className="flex flex-col"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-muted-foreground">
                  We’ll need to verify your new legal name before you can book
                  your next trip.
                </span>
                <ControlledTextInput
                  className="mt-4"
                  maxLength={400}
                  value={value}
                />
                <Button className="mr-auto mt-4">Save And Continue</Button>
              </m.div>
            </LazyAnimatePresence>
            // <div className="flex flex-col">
            //   <span className="text-muted-foreground">
            //     We’ll need to verify your new legal name before you can book
            //     your next trip.
            //   </span>
            //   <ControlledTextInput
            //     className="mt-4"
            //     maxLength={400}
            //     value={value}
            //   />
            //   <Button className="mr-auto mt-4">Save And Continue</Button>
            // </div>
          )}
        </div>
        <Button
          variant="link"
          onClick={() => setIsItemExpanded(isItemExpanded === id ? null : id)}
          className="ml-auto items-start p-0 font-medium"
        >
          Edit
        </Button>
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

      {items.map(RenderItem)}
    </div>
  );
};

const NoticeCard: React.FC = () => {
  return (
    <Card className="ml-20 hidden w-6/12 flex-col p-6 md:flex">
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
