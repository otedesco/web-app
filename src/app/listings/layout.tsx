import { cookies } from "next/headers";
import {
  Cog,
  Heart,
  HelpCircle,
  History,
  LogIn,
  LogOut,
  MessageSquare,
  MessageSquareMore,
  Newspaper,
  Phone,
  Search,
  User,
  UserPlus,
} from "lucide-react";
import { MainNav, MobileMenu } from "~/components/navigation-menu";
import { MainFooter } from "~/components/footer";
import memoize from "lodash/memoize";

const getMobileMenuOptions = memoize((isLoggedIn: boolean) => {
  const baseOptions = [
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

  return isLoggedIn
    ? [
        ...baseOptions,
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
      ]
    : [
        ...baseOptions,
        {
          label: "Log in",
          href: "/auth/login",
          icon: <User className="mb-1 h-6 w-6" />,
        },
      ];
});

// Main menu options based on login status
const getMenuOptions = memoize((isLoggedIn: boolean) => {
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

  return isLoggedIn
    ? {
        highlightedOptions: [
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
        ],
        options: [
          ...commonOptions,
          {
            label: "Log out",
            href: "/logout",
            icon: <LogOut className="mr-2 h-4 w-4" />,
          },
        ],
      }
    : {
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
        options: commonOptions,
      };
});

const ListingLayout = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = cookies().get("isLoggedIn")?.value === "true";

  const menuOptions = getMenuOptions(isLoggedIn);
  const mobileMenuOptions = getMobileMenuOptions(isLoggedIn);

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav menuOptions={menuOptions} />
      {children}
      <MainFooter className="mb-8 hidden md:mb-0 md:block" />
      <MobileMenu menuOptions={mobileMenuOptions} />
    </div>
  );
};

export default ListingLayout;
