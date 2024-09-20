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

import { Menu, MoreVertical, User2Icon } from "lucide-react";
import { useAppSelector } from "~/state/hooks";
import { selectCurrentProfile } from "~/state/features/profile/selectors";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";

interface MenuOption {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface UserDropdownMenuProps {
  menuOptions: {
    highlightedOptions?: MenuOption[];
    options: MenuOption[];
  };
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ menuOptions }) => {
  const t = useTranslations("components->user-dropdown-menu");
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { avatarUrl, name } = useAppSelector(selectCurrentProfile);

  const avatar =
    avatarUrl && name ? (
      <AvatarImage src={avatarUrl} alt={name} />
    ) : (
      <AvatarFallback>{<User2Icon />}</AvatarFallback>
    );

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
          <DropdownMenuGroup>
            {menuOptions.highlightedOptions?.map((option) => (
              <Link key={option.href} href={option.href}>
                <DropdownMenuItem>
                  {option.icon ?? null}
                  <span>{t(option.label)}</span>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {menuOptions.options.map((option) => (
            <Link key={option.href} href={option.href}>
              <DropdownMenuItem>
                {option.icon}
                <span>{t(option.label)}</span>
              </DropdownMenuItem>
            </Link>
          ))}
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
          {menuOptions.highlightedOptions?.map((option) => (
            <DrawerClose key={option.label} asChild>
              <Link key={option.href} href={option.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  //   onClick={item.onClick}
                >
                  {option.icon ?? null}
                  <span>{t(option.label)}</span>
                </Button>
              </Link>
            </DrawerClose>
          ))}
          {menuOptions.options.map((option) => (
            <DrawerClose key={option.label} asChild>
              <Link key={option.href} href={option.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  //   onClick={item.onClick}
                >
                  {option.icon ?? null}
                  <span>{t(option.label)}</span>
                </Button>
              </Link>
            </DrawerClose>
          ))}
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
