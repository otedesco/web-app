import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FooterConfig } from "~/components/footer/main-footer";
import { HeaderConfig } from "~/components/navigation-menu/main-nav";
import { MobileConfig } from "~/components/navigation-menu/mobile-menu";
import {
  Paths,
  footerConfig,
  headerConfig,
  mobileConfig,
} from "~/config/layout";

const getMobileConfigByPathname = (pathname?: string): MobileConfig | null => {
  if (!pathname) return null;

  return mobileConfig[pathname as Paths] ?? null;
};

const getFooterConfigByPathname = (pathname?: string): FooterConfig | null => {
  if (!pathname) return null;

  return footerConfig[pathname as Paths] ?? null;
};

const getHeaderConfigByPathname = (pathname?: string): HeaderConfig | null => {
  if (!pathname) return null;

  return headerConfig[pathname as Paths] ?? null;
};

export function useLayoutConfig(): {
  headerConfig: HeaderConfig | null;
  footerConfig: FooterConfig | null;
  mobileConfig: MobileConfig | null;
} {
  const pathname = usePathname();
  // Ensure that the pathname is only used in its basic form (without query strings or hashes)
  const cleanPathname = useMemo(
    () => pathname?.split("?")[0]?.split("#")[0],
    [pathname],
  );

  const headerConfig = useMemo(
    () => getHeaderConfigByPathname(cleanPathname),
    [cleanPathname],
  );
  const footerConfig = useMemo(
    () => getFooterConfigByPathname(cleanPathname),
    [cleanPathname],
  );
  const mobileConfig = useMemo(
    () => getMobileConfigByPathname(cleanPathname),
    [cleanPathname],
  );

  return { headerConfig, footerConfig, mobileConfig };
}
