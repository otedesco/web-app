import { LogIn, LogOut, UserPlus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui";
import { MenuDialogProps, MenuOption } from "./types";
import UserMenuAvatar from "./user-menu-avatar";

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

const renderOption = ({ href, icon: Icon, label, linkProps }: MenuOption) => {
  const t = useTranslations("components->user-dropdown-menu");
  return (
    <Link key={href} href={href} {...linkProps}>
      <DropdownMenuItem>
        {Icon && Icon}
        <span>{t(label)}</span>
      </DropdownMenuItem>
    </Link>
  );
};

const DesktopUserDropdownMenu = (props: MenuDialogProps) => {
  const t = useTranslations("components->user-dropdown-menu");

  const [open, setOpen] = useState(false);

  const nonLoggedOptionsGroup = (
    <>
      <DropdownMenuGroup>
        {nonLoggedOptions.map(renderOption)}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  );

  const loggedHighlightedOptionsGroup = props.loggedHighlightedOptions ? (
    <>
      <DropdownMenuGroup>
        {props.loggedHighlightedOptions?.map(renderOption)}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  ) : null;

  const loggedOptionsGroup = props.loggedOptions ? (
    <>
      <DropdownMenuGroup>
        {props.loggedOptions?.map(renderOption)}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  ) : null;

  const optionGroup = props.options ? (
    <DropdownMenuGroup>{props.options?.map(renderOption)}</DropdownMenuGroup>
  ) : null;

  const highlightedOptionsGroup = props.highlightedOptions ? (
    <>
      <DropdownMenuGroup>
        {props.highlightedOptions?.map(renderOption)}
      </DropdownMenuGroup>
    </>
  ) : null;

  const signOutOption = (
    <DropdownMenuItem onClick={props.onLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>{t("Log out")}</span>
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <UserMenuAvatar />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* Non Logged default options (Log in, Sign up) */}
        {!props.isLoggedIn && nonLoggedOptionsGroup}
        {/* Non Logged configured highlighted options */}
        {!props.isLoggedIn && highlightedOptionsGroup}
        {/* Logged configured highlighted options */}
        {props.isLoggedIn && loggedHighlightedOptionsGroup}
        {/* Logged configured options  */}
        {props.isLoggedIn && loggedOptionsGroup}
        {/* Non Logged configured options */}
        {!props.isLoggedIn && optionGroup}
        {/* Logged default option (Log out) */}
        {props.isLoggedIn && signOutOption}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DesktopUserDropdownMenu;
