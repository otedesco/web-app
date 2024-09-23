import { HeaderConfig } from "~/components/navigation-menu/main-nav";
import { Button } from "~/components/ui";

const extraComponent = (
  <div className="flex items-center">
    <span className="mr-4 hidden text-gray-700 dark:text-gray-300 sm:inline">
      Ready to become an agent?
    </span>
    <Button variant="default" size="sm">
      Get Started
    </Button>
  </div>
);

export const headerConfig: HeaderConfig = {
  type: "minimal",
  hasUserMenu: false,
  hasThemeToggle: false,
  hasSearchBox: false,
  logoType: "auto",
  showRightSideOnMobile: false,
  extraComponent,
};
