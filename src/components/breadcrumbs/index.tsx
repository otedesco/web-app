"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
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
    <nav aria-label="Breadcrumb" className={cn("mb-4 min-h-8", className)}>
      <ol className="text-md flex items-center space-x-2 text-gray-500">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index !== 0 && (
              <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            )}
            {index === items.length - 1 ? (
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
