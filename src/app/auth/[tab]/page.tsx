import { motion } from "framer-motion";
import { Card } from "~/components/ui";
import AuthView from "~/views/auth-view";
import { type TabsEnum } from "~/views/auth-view/types";

export type AuthPageProps = { params: { tab: TabsEnum } };

export default function AuthPage({ params: { tab } }: AuthPageProps) {
  return (
    <Card className="z-10 flex w-full max-w-[95%] flex-col overflow-hidden sm:max-w-md">
      <AuthView tab={tab} />
    </Card>
  );
}
