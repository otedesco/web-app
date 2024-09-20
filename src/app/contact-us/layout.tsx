import { LogIn, Newspaper, Phone, UserPlus } from "lucide-react";
import { MainFooter } from "~/components/footer";
import SimpleNav from "~/components/navigation-menu/simple-nav";
import UserDropdownMenu from "~/components/user-dropdown-menu";

const menuOptions = {
  highlightedOptions: [
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

export const ContactUsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SimpleNav>
        <UserDropdownMenu menuOptions={menuOptions} />
      </SimpleNav>
      {children}
      <MainFooter />
    </div>
  );
};

export default ContactUsLayout;
