"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
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
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useAppSelector } from "~/state/hooks";
import { selectSelectedRole } from "~/state/features/profile/selectors";
import { loggedHighlightedOptions, loggedOptions, menuOptions } from "./config";

export interface MainNavProps {
  children: React.ReactNode;
  isMinimal?: boolean;
  rightSideComponent?: React.ReactNode;
  menuOptions?: typeof menuOptions;
  showSearchBox?: boolean;
}

const MobileMenu = () => {
  const t = useTranslations("components->main-nav");

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
      </div>
    </div>
  );
};

const DefaultRightSideComponent = (props: {
  label: string;
  menuOptions: typeof menuOptions;
}) => {
  return (
    <div className="hidden items-center space-x-4 md:flex">
      {/* Should receive this components as props  */}
      <Link href="/publish">
        <Button variant="ghost" className="text-sm font-medium">
          {props.label}
        </Button>
      </Link>
      <ThemeToggle />
      {/* should receive menu options as props */}
      <UserDropdownMenu menuOptions={props.menuOptions} />
    </div>
  );
};

export const MainNav = (props: MainNavProps) => {
  const t = useTranslations("components->main-nav");
  const selectedRole = useAppSelector(selectSelectedRole);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const defaultMenuOptions = isLoggedIn
    ? {
        options: loggedOptions,
        highlightedOptions: loggedHighlightedOptions,
      }
    : menuOptions;

  const {
    rightSideComponent = (
      <DefaultRightSideComponent
        menuOptions={props.menuOptions ?? defaultMenuOptions}
        label={!selectedRole ? t("Become an Agent") : t("Publish a Property")}
      />
    ),
    isMinimal = false,
    showSearchBox = true,
  } = props;

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              {isDesktop && !isMinimal && <BrandLogoWithText />}
              {(!isDesktop || isMinimal) && <BrandLogo />}
            </div>
            {showSearchBox && (
              <div className="mx-4 max-w-2xl flex-1">
                <SearchModal />
              </div>
            )}
            {rightSideComponent}
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
