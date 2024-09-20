import { Glasses, ListIcon, LogIn, Newspaper, UserPlus } from "lucide-react";
import { MainFooter } from "~/components/footer";
import SimpleNav from "~/components/navigation-menu/simple-nav";
import UserDropdownMenu from "~/components/user-dropdown-menu";

const menuOptions = {
  highlightedOptions: [
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
  ],
  options: [
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
};

export const ResourceCenterLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SimpleNav pathname="Resource Center">
        <UserDropdownMenu menuOptions={menuOptions} />
      </SimpleNav>
      {children}
      <MainFooter />
    </div>
  );
};

export default ResourceCenterLayout;
