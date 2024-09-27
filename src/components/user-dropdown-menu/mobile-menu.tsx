import { MenuDialogProps, MenuOption } from "./types";
import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LogIn, UserPlus } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui";
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

const RenderDrawerOption = ({ href, icon: Icon, label }: MenuOption) => {
  const t = useTranslations("components->user-dropdown-menu");
  return (
    <DrawerClose key={href} asChild>
      <Link href={href}>
        <Button variant="ghost" className="w-full justify-start">
          {Icon ?? Icon}
          <span>{t(label)}</span>
        </Button>
      </Link>
    </DrawerClose>
  );
};

const MobileUserDropdownMenu = ({
  isLoggedIn,
  options,
  loggedOptions,
  highlightedOptions,
  loggedHighlightedOptions,
  onLogout,
}: MenuDialogProps) => {
  const [open, setOpen] = useState(false);

  const t = useTranslations("components->user-dropdown-menu");

  const drawerSignOutOption = (
    <DrawerClose asChild onClick={onLogout}>
      <Button variant="ghost" className="w-full justify-start">
        {t("Log out")}
      </Button>
    </DrawerClose>
  );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <UserMenuAvatar />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          {/* Non Logged default options (Log in, Sign up) */}
          {!isLoggedIn && nonLoggedOptions.map(RenderDrawerOption)}
          {/* Non Logged configured highlighted options */}
          {!isLoggedIn && highlightedOptions
            ? highlightedOptions?.map(RenderDrawerOption)
            : null}
          {/* Logged configured highlighted options */}
          {isLoggedIn && loggedHighlightedOptions
            ? loggedHighlightedOptions?.map(RenderDrawerOption)
            : null}
          {/* Logged configured options  */}
          {isLoggedIn && loggedOptions
            ? loggedOptions?.map(RenderDrawerOption)
            : null}
          {/* Non Logged configured options */}
          {!isLoggedIn && options ? options?.map(RenderDrawerOption) : null}
          {/* Logged default option (Log out) */}
          {isLoggedIn && drawerSignOutOption}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">{t("Cancel")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileUserDropdownMenu;
