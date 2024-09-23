import {
  Cog,
  Heart,
  HelpCircle,
  History,
  MessageSquare,
  MessageSquareMore,
  Newspaper,
  Phone,
  Search,
  User,
} from "lucide-react";
import { FooterConfig } from "~/components/footer/main-footer";
import { HeaderConfig } from "~/components/navigation-menu/main-nav";
import { MobileConfig } from "~/components/navigation-menu/mobile-menu";
import PublishLink from "~/components/publish-link";

const commonOptions = [
  {
    label: "Help Center",
    href: "/help",
    linkProps: { target: "_blank", rel: "noreferrer" },
    icon: <HelpCircle className="mr-2 h-4 w-4" />,
  },
  {
    label: "Contact Us",
    href: "/contact-us",
    linkProps: { target: "_blank", rel: "noreferrer" },
    icon: <Phone className="mr-2 h-4 w-4" />,
  },
  {
    label: "News",
    href: "/news",
    linkProps: { target: "_blank", rel: "noreferrer" },
    icon: <Newspaper className="mr-2 h-4 w-4" />,
  },
];

const commonLoggedOptions = [
  {
    label: "Messages",
    href: "/messages",
    icon: <MessageSquare className="mr-2 h-4 w-4" />,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: <Heart className="mr-2 h-4 w-4" />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Cog className="mr-2 h-4 w-4" />,
  },
];

export const headerConfig: HeaderConfig = {
  type: "default",
  hasUserMenu: true,
  hasThemeToggle: true,
  hasSearchBox: true,
  logoType: "auto",
  extraComponent: <PublishLink />,
  showRightSideOnMobile: false,
  userMenuOptions: {
    showOnMobile: false,
    loggedHighlightedOptions: commonLoggedOptions,
    loggedOptions: commonOptions,
    options: commonOptions,
  },
};

export const footerConfig: FooterConfig = {
  type: "default",
  showOnMobile: true,
};

const commonMobileOptions = [
  {
    label: "Explore",
    href: "/",
    icon: <Search className="mb-1 h-6 w-6" />,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: <Heart className="mb-1 h-6 w-6" />,
  },
];

export const mobileConfig: MobileConfig = {
  loggedOptions: [
    ...commonMobileOptions,
    {
      label: "History",
      href: "/history",
      icon: <History className="mb-1 h-6 w-6" />,
    },
    {
      label: "Messages",
      href: "/mesages",
      icon: <MessageSquareMore className="mb-1 h-6 w-6" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <User className="mb-1 h-6 w-6" />,
    },
  ],
  options: [
    ...commonMobileOptions,
    {
      label: "Log in",
      href: "/auth/login",
      icon: <User className="mb-1 h-6 w-6" />,
    },
  ],
};
