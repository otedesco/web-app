import { MainFooter } from "~/components/footer";

import { MainNav } from "~/components/navigation-menu";

export const LandingViewTemplate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav>
        {children}
        <MainFooter />
      </MainNav>
    </div>
  );
};

export default LandingViewTemplate;
