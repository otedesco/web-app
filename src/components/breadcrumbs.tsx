"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  className?: string;
  basePath?: string;
  showInBasePath?: boolean;
}

export default function Breadcrumb({
  className,
  basePath = "",
  showInBasePath = true,
}: BreadcrumbProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("components->breadcrumbs");

  // Break the pathname into segments
  const pathSegments = pathname.split("/").filter(Boolean);

  // Conditionally include basePath in the breadcrumb if required
  const fullPathSegments =
    basePath && showInBasePath ? [basePath, ...pathSegments] : pathSegments;

  let accumulatedPath = "";

  const items: BreadcrumbItem[] = fullPathSegments.map((segment) => {
    accumulatedPath += `/${segment}`;
    return {
      label: t(segment),
      href: accumulatedPath,
    };
  });

  if (pathSegments.length == 1 && !showInBasePath) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("w-full content-center bg-background/90", className)}
    >
      <ol className="text-md mx-auto flex max-w-screen-xl items-center space-x-2 px-4 text-gray-500">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index !== 0 && (
              <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            )}
            {index === items.length - 1 && !searchParams ? (
              <span className="font-medium text-muted-foreground">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
