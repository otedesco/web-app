"use client";
import Link from "next/link";

import { useTranslations } from "next-intl";
import React from "react";

import BrandLogo from "../brand-logo";
import UserDropdownMenu from "../user-dropdown-menu";
import { HeaderConfig } from "./main-nav";
import { useMediaQuery } from "~/hooks/useMediaQuery";

export type SimpleNavProps = HeaderConfig;

export default function SimpleNav({
  logoType,
  title,
  extraComponent,
  hasUserMenu,
  userMenuOptions,
  showOnMobile,
}: SimpleNavProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const t = useTranslations("components->simple-nav");

  if (!showOnMobile && !isDesktop) return null;
  return (
    <nav className="sticky top-0 z-20 bg-background backdrop-blur-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <BrandLogo variant={logoType} gradient dynamic resize />
              {title && (
                <span className="ml-2 font-sans text-xl font-normal tracking-tight">
                  {t(title)}
                </span>
              )}
            </Link>
          </div>
          <div className="flex items-center">
            {extraComponent}
            {hasUserMenu && <UserDropdownMenu {...userMenuOptions} />}
          </div>
        </div>
      </div>
    </nav>
  );
}
