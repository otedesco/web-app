import React from "react";
import GlowEffect from "~/components/glow-effect";
import { Card } from "~/components/ui";

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-2 sm:p-4">
      <div className="group relative">
        <GlowEffect />
        <Card className="relative z-50 w-full overflow-hidden sm:max-w-md">
          {children}
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
