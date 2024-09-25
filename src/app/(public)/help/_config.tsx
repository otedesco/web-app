import { LogIn, UserCog, UserPlus } from "lucide-react";
import { HeaderConfig } from "~/components/navigation-menu/main-nav";

const commonHighlightedOptions = [
  {
    label: "All help topics",
    href: "/help/all-topics",
    icon: <LogIn className="mr-2 h-4 w-4" />,
  },
  {
    label: "Agent resources",
    href: "/resources/agents",
    icon: <UserPlus className="mr-2 h-4 w-4" />,
  },
];

export const headerConfig: HeaderConfig = {
  type: "minimal",
  hasUserMenu: true,
  hasThemeToggle: false,
  hasSearchBox: false,
  logoType: "minimal",
  extraComponent: null,
  showRightSideOnMobile: false,
  title: "Help Center",
  showOnMobile: true,
  userMenuOptions: {
    showOnMobile: true,
    highlightedOptions: commonHighlightedOptions,
    loggedHighlightedOptions: [
      ...commonHighlightedOptions,
      {
        label: "Profile",
        href: "/profile",
        icon: <UserCog className="mr-2 h-4 w-4" />,
      },
    ],
  },
};
