import { Glasses, ListIcon, Newspaper, UserCog } from "lucide-react";
import { HeaderConfig } from "~/components/navigation-menu/main-nav";

const commonHighlightedOptions = [
  {
    label: "Topics",
    href: "/resources/all-topics",
    icon: <ListIcon className="mr-2 h-4 w-4" />,
  },
  {
    label: "Learning",
    href: "/resources/learning",
    icon: <Glasses className="mr-2 h-4 w-4" />,
  },
  {
    label: "News",
    href: "/news",
    icon: <Newspaper className="mr-2 h-4 w-4" />,
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
  title: "Resource Center",
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
    // loggedOptions: commonOptions,
    // options: commonOptions,
  },
};
export const footerConfig = {};
export const mobileConfig = {};
