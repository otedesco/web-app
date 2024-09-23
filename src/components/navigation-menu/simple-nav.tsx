import Link from "next/link";

import { useTranslations } from "next-intl";
import React from "react";

import BrandLogo from "../brand-logo";
import UserDropdownMenu from "../user-dropdown-menu";
import { HeaderConfig } from "./main-nav";

export type SimpleNavProps = HeaderConfig;

export default function SimpleNav({
  logoType,
  title,
  extraComponent,
  hasUserMenu,
  userMenuOptions,
}: SimpleNavProps) {
  const t = useTranslations("components->simple-nav");
  console.log(logoType);
  return (
    <nav className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <BrandLogo logoType={logoType} />
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
