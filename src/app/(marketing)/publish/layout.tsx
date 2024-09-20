import { MainFooter } from "~/components/footer";
import SimpleNav from "~/components/navigation-menu/simple-nav";
import { Button } from "~/components/ui";

const PublishLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SimpleNav>
        <div className="flex items-center">
          <span className="mr-4 hidden text-gray-700 dark:text-gray-300 sm:inline">
            Ready to become an agent?
          </span>
          <Button variant="default" size="sm">
            Get Started
          </Button>
        </div>
      </SimpleNav>
      {children}
      <MainFooter />
    </div>
  );
};

export default PublishLayout;
