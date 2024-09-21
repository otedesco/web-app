import {
  Cog,
  Heart,
  HelpCircle,
  LogIn,
  LogOut,
  MessageSquare,
  Newspaper,
  Phone,
  UserPlus,
} from "lucide-react";

export const menuOptions = {
  highlightedOptions: [
    {
      label: "Log in",
      href: "/auth/login",
      icon: <LogIn className="mr-2 h-4 w-4" />,
    },
    {
      label: "Sign up",
      href: "/auth/signup",
      icon: <UserPlus className="mr-2 h-4 w-4" />,
    },
  ],
  options: [
    {
      label: "Help Center",
      href: "/help",
      icon: <HelpCircle className="mr-2 h-4 w-4" />,
    },
    {
      label: "Contact Us",
      href: "/contact-us",
      icon: <Phone className="mr-2 h-4 w-4" />,
    },
    {
      label: "News",
      href: "/news",
      icon: <Newspaper className="mr-2 h-4 w-4" />,
    },
  ],
};

export const loggedHighlightedOptions = [
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

export const loggedOptions = [
  ...menuOptions.options,
  {
    label: "Log out",
    href: "/auth/logout",
    icon: <LogOut className="mr-2 h-4 w-4" />,
  },
];
