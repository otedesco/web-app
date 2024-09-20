"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  DollarSign,
  Heart,
  HelpCircle,
  LogIn,
  Menu,
  Newspaper,
  Phone,
  Search,
  User,
  UserPlus,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import { SearchModal } from "~/components/search-modal";

import Link from "next/link";
import { BrandLogo, BrandLogoWithText } from "../brand-logo";
import UserDropdownMenu from "../user-dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";

const menuOptions = {
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
      label: "Sell or Rent Property",
      href: "/publish",
      icon: <DollarSign className="mr-2 h-4 w-4" />,
    },
    {
      label: "News",
      href: "/news",
      icon: <Newspaper className="mr-2 h-4 w-4" />,
    },
  ],
};

export interface MainNavProps {
  children: React.ReactNode;
}

const MobileMenu = () => {
  const t = useTranslations("components->main-nav");
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-md md:hidden">
      <div className="flex justify-around py-2">
        <Link href="/" className="flex flex-col items-center py-0">
          <div className="flex flex-col items-center">
            <Search className="mb-1 h-6 w-6" />
            <span className="text-xs">{t("Explore")}</span>
          </div>
        </Link>
        <Link href="/wishlist" className="flex flex-col items-center py-0">
          <div className="flex flex-col items-center">
            <Heart className="mb-1 h-6 w-6" />
            <span className="text-xs">{t("Wishlist")}</span>
          </div>
        </Link>
        <Link href="/auth/login" className="flex flex-col items-center py-0">
          <div className="flex flex-col items-center">
            <User className="mb-1 h-6 w-6" />
            <span className="text-xs">{t("Log in")}</span>
          </div>
        </Link>
        {/* TODO Remove this component after testing*/}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              className="relative flex items-center space-x-2 rounded-full p-2 hover:bg-accent"
            >
              <Menu className="mb-1 h-6 w-6" />
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
                <Button variant="outline">{t("Cancel")}</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export const MainNav = (props: MainNavProps) => {
  const t = useTranslations("components->main-nav");

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <BrandLogoWithText className="hidden lg:block" />
              <BrandLogo className="lg:hidden" />
            </div>
            <div className="mx-4 max-w-2xl flex-1">
              <SearchModal />
            </div>
            <div className="hidden items-center space-x-4 md:flex">
              {/* Should receive this components as props  */}
              <Link href="/publish">
                <Button variant="ghost" className="text-sm font-medium">
                  {t("Become an Agent")}
                </Button>
              </Link>
              <ThemeToggle />
              {/* should receive menu options as props */}
              <UserDropdownMenu menuOptions={menuOptions} />
            </div>
          </div>
        </div>
      </header>

      {props.children}

      {/* should receive menu options as props */}
      <MobileMenu />
    </>
  );
};

export default MainNav;
