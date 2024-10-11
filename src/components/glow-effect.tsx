"use client";

import React, { useEffect, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "~/lib/utils";

interface GlowEffectProps {
  className?: string;
}

const GlowEffect: React.FC<GlowEffectProps> = ({ className }) => {
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const controls = animate(0, 360, {
      ease: "linear",
      duration: 5,
      repeat: Infinity,
      onUpdate: (latest) => {
        setDirection(latest);
      },
    });

    return () => controls.stop();
  }, []);

  const backgroundImage = `linear-gradient(${direction}deg, hsl(var(--brand-primary)), hsl(var(--brand-contrast)))`;

  return (
    <div
      style={{ backgroundImage }}
      className={cn(
        "absolute -inset-1 hidden rounded-lg opacity-50 blur sm:block",
        className,
      )}
    />
  );
};

export default GlowEffect;
