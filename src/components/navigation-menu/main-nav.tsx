"use client";

import React from "react";
import { ThemeToggle } from "~/components/theme-toggle";
import { SearchModal } from "~/components/search-modal";
import Link from "next/link";
import UserDropdownMenu, { UserDropdownMenuProps } from "../user-dropdown-menu";
import { useLayoutConfig } from "~/hooks/useLayoutConfig";
import SimpleNav from "./simple-nav";

import { cn } from "~/lib/utils";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import BrandLogo, { LogoProps } from "~/components/brand-logo";

export type HeaderConfig = {
  type: "minimal" | "default";
  hasUserMenu: boolean;
  showOnMobile?: boolean;
  hasSearchBox: boolean;
  logoType: LogoProps["variant"];
  userMenuOptions?: UserDropdownMenuProps;
  hasThemeToggle?: boolean;
  showRightSideOnMobile?: boolean;
  title?: string;
  extraComponent?: React.ReactNode;
};

export const MainNav = () => {
  const { headerConfig } = useLayoutConfig();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (!headerConfig) return null;

  if (headerConfig.type === "minimal") {
    return <SimpleNav {...headerConfig} />;
  }

  if (!headerConfig.showOnMobile && !isDesktop) return null;

  return (
    <header className="pl-[calc(100vw - 100%)] sticky top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto h-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16">
          <div className="flex items-center lg:flex-shrink-0 lg:flex-grow lg:basis-14">
            <Link href="/">
              <BrandLogo
                className="h-full"
                variant="full"
                resize
                gradient
                dynamic
              />
            </Link>
          </div>
          {headerConfig.hasSearchBox && (
            <div className="ml-2 flex h-auto w-full items-center md:w-auto lg:flex-shrink lg:flex-grow-0 lg:basis-auto">
              <SearchModal />
            </div>
          )}
          <div
            className={cn(
              "hidden w-full flex-shrink-0 flex-grow basis-28 items-center space-x-4 md:flex",
              headerConfig.showRightSideOnMobile ? "flex" : "hidden md:flex",
            )}
          >
            <div className="flex w-full items-center justify-end md:ml-auto md:max-w-max">
              {headerConfig.extraComponent && headerConfig.extraComponent}
              {headerConfig.hasThemeToggle && <ThemeToggle />}
            </div>

            {headerConfig.hasUserMenu && headerConfig.userMenuOptions && (
              <UserDropdownMenu {...headerConfig.userMenuOptions} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
