import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  Paths,
  footerConfig,
  headerConfig,
  mobileConfig,
} from "~/config/layout";

const getConfigByPathname = <T>(
  config: Record<Paths, T>,
  pathname?: string,
): T | null => {
  if (!pathname) return null;
  return config[pathname as Paths] ?? null;
};

export function useLayoutConfig() {
  const pathname = usePathname();

  return useMemo(() => {
    const cleanPathname = pathname?.split("?")[0]?.split("#")[0];

    return {
      headerConfig: getConfigByPathname(headerConfig, cleanPathname),
      footerConfig: getConfigByPathname(footerConfig, cleanPathname),
      mobileConfig: getConfigByPathname(mobileConfig, cleanPathname),
    };
  }, [pathname]);
}
