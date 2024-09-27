import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useSignOut } from "~/lib/hooks/useLogOut";
import DesktopUserDropdownMenu from "./desktop-menu";
import MobileUserDropdownMenu from "./mobile-menu";

export type LinkProps = {
  target?: string;
  rel?: string;
};

export interface MenuOption {
  label: string;
  href: string;
  linkProps?: LinkProps;
  icon?: React.ReactNode;
}

export interface UserDropdownMenuProps {
  showOnMobile?: boolean;
  loggedHighlightedOptions?: MenuOption[];
  loggedOptions?: MenuOption[];
  highlightedOptions?: MenuOption[];
  options?: MenuOption[];
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({
  showOnMobile,
  ...rest
}) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { signOutAsync } = useSignOut({});
  const router = useRouter();

  const handleLogOut = useCallback(async () => {
    await signOutAsync(undefined);

    router.push("/auth/login");
  }, [router, signOutAsync]);

  if (!isDesktop && !showOnMobile) return null;

  if (isDesktop) {
    return (
      <DesktopUserDropdownMenu
        isLoggedIn={isLoggedIn}
        onLogout={handleLogOut}
        {...rest}
      />
    );
  }

  return (
    <MobileUserDropdownMenu
      isLoggedIn={isLoggedIn}
      onLogout={handleLogOut}
      {...rest}
    />
  );
};

export default UserDropdownMenu;
