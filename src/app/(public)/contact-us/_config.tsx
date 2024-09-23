import { Newspaper, UserCog } from "lucide-react";
import { HeaderConfig } from "~/components/navigation-menu/main-nav";

const commonHighlightedOptions = [
  {
    label: "Press resources",
    href: "/news/resources",
    icon: <Newspaper className="mr-2 h-4 w-4" />,
  },
  {
    label: "About Us",
    href: "/about-us",
    icon: <Newspaper className="mr-2 h-4 w-4" />,
  },
];

export const headerConfig: HeaderConfig = {
  type: "minimal",
  hasUserMenu: true,
  hasThemeToggle: false,
  hasSearchBox: false,
  logoType: "full",
  extraComponent: null,
  showRightSideOnMobile: false,
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
    // loggedOptions: commonOptions,
    // options: commonOptions,
  },
};
