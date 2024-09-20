import Link from "next/link";
import { BrandLogo } from "../brand-logo";
import { useTranslations } from "next-intl";
import React from "react";

export type SimpleNavProps = {
  className?: string;
  pathname?: string;
  children: React.ReactNode;
};

export default function SimpleNav({ pathname, children }: SimpleNavProps) {
  const t = useTranslations("components->simple-nav");

  return (
    <nav className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <BrandLogo />
              {pathname && (
                <span className="ml-2 font-sans text-xl font-normal tracking-tight">
                  {t(pathname)}
                </span>
              )}
            </Link>
          </div>
          <div className="flex items-center">{children}</div>
        </div>
      </div>
    </nav>
  );
}
