"use client";

import React from "react";
import { ThemeToggle } from "~/components/theme-toggle";
import { SearchModal } from "~/components/search-modal";
import Link from "next/link";
import UserDropdownMenu, { UserDropdownMenuProps } from "../user-dropdown-menu";
import { useLayoutConfig } from "~/hooks/useLayoutConfig";
import SimpleNav from "./simple-nav";
import BrandLogo, { LogoType } from "../brand-logo";
import { cn } from "~/lib/utils";

export type HeaderConfig = {
  type: "minimal" | "default";
  hasUserMenu: boolean;
  hasSearchBox: boolean;
  logoType: LogoType;
  userMenuOptions?: UserDropdownMenuProps;
  hasThemeToggle?: boolean;
  showRightSideOnMobile?: boolean;
  title?: string;
  extraComponent?: React.ReactNode;
};

export const MainNav = () => {
  const { headerConfig } = useLayoutConfig();

  if (!headerConfig) return null;
  if (headerConfig.type === "minimal") {
    return <SimpleNav {...headerConfig} />;
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <BrandLogo logoType={headerConfig?.logoType} />
            </Link>
          </div>
          {headerConfig.hasSearchBox && (
            <div className="mx-4 max-w-2xl flex-1">
              <SearchModal />
            </div>
          )}
          <div
            className={cn(
              "hidden items-center space-x-4 md:flex",
              headerConfig.showRightSideOnMobile ? "flex" : "hidden md:flex",
            )}
          >
            {headerConfig.extraComponent && headerConfig.extraComponent}
            {headerConfig.hasThemeToggle && <ThemeToggle />}
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
