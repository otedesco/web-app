"use client";

import React, { memo } from "react";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import Logo from "./logo";
import LogoWithText from "./logo-with-text";

const AutoBrandLogo = (props: any) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  return isMobile ? <Logo {...props} /> : <LogoWithText {...props} />;
};

export default memo(AutoBrandLogo);
