import Link from "next/link";
import { HeaderConfig } from "~/components/navigation-menu/main-nav";
import PublishLink from "~/components/publish-link";
import { Button } from "~/components/ui";
import { Paths } from "~/config/layout";

const extraComponent = (
  <div className="flex items-center">
    <PublishLink asText />
    <Link href="/onboarding">
      <Button variant="default" size="sm">
        Get Started
      </Button>
    </Link>
  </div>
);

export const headerConfig: HeaderConfig = {
  type: "minimal",
  hasUserMenu: false,
  hasThemeToggle: false,
  hasSearchBox: false,
  logoType: "auto",
  showRightSideOnMobile: false,
  showOnMobile: true,
  extraComponent,
};
