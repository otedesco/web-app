"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { useLayoutConfig } from "~/hooks/useLayoutConfig";
import { cn } from "~/lib/utils";

// Type definition for a single menu option
export type MenuOption = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export type MobileConfig = {
  loggedOptions?: MenuOption[];
  options?: MenuOption[];
};

export type MobileMenuProps = {
  className?: string;
};

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const t = useTranslations("components->main-nav");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const { mobileConfig } = useLayoutConfig();

  const menuOptions = isLoggedIn
    ? mobileConfig?.loggedOptions
    : mobileConfig?.options;

  if (!mobileConfig) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-md md:hidden",
        className,
      )}
    >
      <div className="flex justify-around py-2">
        {menuOptions?.map((option) => (
          <Link
            key={option.href}
            href={option.href}
            className="flex flex-col items-center py-0"
          >
            <div className="flex flex-col items-center">
              {option.icon}
              <span className="text-xs">{t(option.label)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
