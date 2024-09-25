import { Newspaper, Phone, UserCog } from "lucide-react";
import { HeaderConfig } from "~/components/navigation-menu/main-nav";

const commonHighlightedOptions = [
  {
    label: "Contact Us",
    href: "/contact-us",
    icon: <Phone className="mr-2 h-4 w-4" />,
  },
  {
    label: "Press resources",
    href: "/news/resources",
    icon: <Newspaper className="mr-2 h-4 w-4" />,
  },
];

export const headerConfig: HeaderConfig = {
  type: "minimal",
  hasUserMenu: true,
  hasThemeToggle: false,
  hasSearchBox: false,
  logoType: "auto",
  extraComponent: null,
  showRightSideOnMobile: false,
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
