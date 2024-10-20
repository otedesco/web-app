import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useSignOut } from "~/lib/cerberus/hooks";
import DesktopUserDropdownMenu from "./desktop-menu";
import MobileUserDropdownMenu from "./mobile-menu";
import { useAppSelector } from "~/state/hooks";
import { selectCurrentProfile } from "~/state/features/profile/selectors";
import { useProfileActions } from "~/state/features/profile/hooks";

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
  // TODO: Remove this
  useProfileActions();
  const currentProfile = useAppSelector(selectCurrentProfile);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { mutateAsync } = useSignOut({});
  const router = useRouter();

  const handleLogOut = useCallback(async () => {
    await mutateAsync(undefined);
    router.push("/auth/login");
  }, [router, mutateAsync]);

  const isLoggedIn = useMemo(
    () => currentProfile.id !== null,
    [currentProfile.id],
  );

  if (!isDesktop && !showOnMobile) return null;

  const MenuComponent = isDesktop
    ? DesktopUserDropdownMenu
    : MobileUserDropdownMenu;

  return (
    <MenuComponent isLoggedIn={isLoggedIn} onLogout={handleLogOut} {...rest} />
  );
};

export default UserDropdownMenu;
