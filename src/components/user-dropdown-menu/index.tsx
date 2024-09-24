"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from "~/components/ui";

import { LogIn, LogOut, Menu, User2Icon, UserPlus } from "lucide-react";
import { useAppSelector } from "~/state/hooks";
import { selectCurrentProfile } from "~/state/features/profile/selectors";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useCallback, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";
import { useSignOut } from "~/lib/hooks/useLogOut";
import { useRouter } from "next/navigation";

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

const nonLoggedOptions = [
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
];

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({
  showOnMobile,
  loggedHighlightedOptions,
  loggedOptions,
  highlightedOptions,
  options,
}) => {
  const t = useTranslations("components->user-dropdown-menu");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { avatarUrl, name } = useAppSelector(selectCurrentProfile);
  const [open, setOpen] = useState(false);
  const { signOutAsync } = useSignOut({});
  const router = useRouter();

  const handleLogOut = useCallback(async () => {
    await signOutAsync(undefined);

    router.push("/auth/login");
  }, [router, signOutAsync]);

  const avatar =
    avatarUrl && name ? (
      <AvatarImage src={avatarUrl} alt={name} />
    ) : (
      <AvatarFallback>
        <User2Icon className="h-4 w-4" />
      </AvatarFallback>
    );

  const renderOption = ({ href, icon: Icon, label, linkProps }: MenuOption) => (
    <Link key={href} href={href} {...linkProps}>
      <DropdownMenuItem>
        {Icon && Icon}
        <span>{t(label)}</span>
      </DropdownMenuItem>
    </Link>
  );

  const renderDrawerOption = ({ href, icon: Icon, label }: MenuOption) => (
    <DrawerClose key={href} asChild>
      <Link href={href}>
        <Button variant="ghost" className="w-full justify-start">
          {Icon ?? Icon}
          <span>{t(label)}</span>
        </Button>
      </Link>
    </DrawerClose>
  );

  const nonLoggedOptionsGroup = (
    <>
      <DropdownMenuGroup>
        {nonLoggedOptions.map(renderOption)}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  );

  const signOutOption = (
    <DropdownMenuItem onClick={handleLogOut}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>{t("Log out")}</span>
    </DropdownMenuItem>
  );

  const drawerSignOutOption = (
    <DrawerClose asChild onClick={handleLogOut}>
      <Button variant="ghost" className="w-full justify-start">
        {t("Log out")}
      </Button>
    </DrawerClose>
  );

  const loggedHighlightedOptionsGroup = loggedHighlightedOptions ? (
    <>
      <DropdownMenuGroup>
        {loggedHighlightedOptions?.map(renderOption)}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  ) : null;

  const loggedOptionsGroup = loggedOptions ? (
    <>
      <DropdownMenuGroup>{loggedOptions?.map(renderOption)}</DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  ) : null;

  const optionGroup = options ? (
    <>
      <DropdownMenuGroup>{options?.map(renderOption)}</DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  ) : null;

  const highlightedOptionsGroup = highlightedOptions ? (
    <>
      <DropdownMenuGroup>
        {highlightedOptions?.map(renderOption)}
      </DropdownMenuGroup>
    </>
  ) : null;

  if (!isDesktop && !showOnMobile) return null;

  if (isDesktop) {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative flex items-center space-x-2 rounded-full p-2 hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
            <Avatar className="h-8 w-8">{avatar}</Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {/* Non Logged default options (Log in, Sign up) */}
          {!isLoggedIn && nonLoggedOptionsGroup}
          {/* Non Logged configured highlighted options */}
          {!isLoggedIn && highlightedOptionsGroup}
          {/* Logged configured highlighted options */}
          {isLoggedIn && loggedHighlightedOptionsGroup}
          {/* Logged configured options  */}
          {isLoggedIn && loggedOptionsGroup}
          {/* Non Logged configured options */}
          {!isLoggedIn && optionGroup}
          {/* Logged default option (Log out) */}
          {isLoggedIn && signOutOption}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center space-x-2 rounded-full p-2 hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
          <Avatar className="h-8 w-8">{avatar}</Avatar>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          {/* Non Logged default options (Log in, Sign up) */}
          {!isLoggedIn && nonLoggedOptions.map(renderDrawerOption)}
          {/* Non Logged configured highlighted options */}
          {!isLoggedIn && highlightedOptions
            ? highlightedOptions?.map(renderDrawerOption)
            : null}
          {/* Logged configured highlighted options */}
          {isLoggedIn && loggedHighlightedOptions
            ? loggedHighlightedOptions?.map(renderDrawerOption)
            : null}
          {/* Logged configured options  */}
          {isLoggedIn && loggedOptions
            ? loggedOptions?.map(renderDrawerOption)
            : null}
          {/* Non Logged configured options */}
          {!isLoggedIn && options ? options?.map(renderDrawerOption) : null}
          {/* Logged default option (Log out) */}
          {isLoggedIn && drawerSignOutOption}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UserDropdownMenu;
