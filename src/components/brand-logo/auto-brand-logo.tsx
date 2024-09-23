"use client";

import React, { memo } from "react";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import Logo from "./logo";
import LogoWithText from "./logo-with-text";

const AutoBrandLogo = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile ? <Logo /> : <LogoWithText />;
};

export default memo(AutoBrandLogo);
