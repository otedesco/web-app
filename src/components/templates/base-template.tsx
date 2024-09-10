import MainFooter from "../main-footer";
import { MainNav } from "../main-nav";

export default function BaseTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav>
        {children}
        <MainFooter />
      </MainNav>
    </div>
  );
}
