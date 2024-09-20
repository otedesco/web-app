import AuthView from "~/views/auth-view";
import { type TabsEnum } from "~/views/auth-view/types";

export type AuthPageProps = { params: { tab: TabsEnum } };

export default function AuthPage({ params: { tab } }: AuthPageProps) {
  return <AuthView tab={tab} />;
}
