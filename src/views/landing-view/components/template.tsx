import { MainFooter } from "~/components/footer";
import { MainNav, MobileMenu } from "~/components/navigation-menu";

export const LandingViewTemplate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      {children}
      <MainFooter className="mb-8 md:mb-0" />
      <MobileMenu />
    </div>
  );
};

export default LandingViewTemplate;
