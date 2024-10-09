import { memo } from "react";
import Logo from "./logo";
import LogoWithText from "./logo-with-text";
import AutoBrandLogo from "./auto-brand-logo";

export type LogoType = "minimal" | "full" | "auto";

interface BrandLogoProps {
  className?: string;
  logoType?: LogoType;
}

const BrandLogo = (props: BrandLogoProps) => {
  const { logoType = "auto" } = props;

  if (logoType === "minimal") {
    return <Logo {...props} />;
  }
  if (logoType === "full") {
    return <LogoWithText {...props} />;
  }
  return <AutoBrandLogo {...props} />;
};

export default memo(BrandLogo);
