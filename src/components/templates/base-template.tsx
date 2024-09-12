import { MainFooter } from "~/components/footer";
import { MainNav } from "~/components/navigation-menu";

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
