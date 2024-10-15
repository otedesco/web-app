import React from "react";

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex h-dvh items-center justify-center overflow-hidden p-2 sm:p-4">
      <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="bg-[url('data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><g fill-opacity=%22.1%22><circle r=%2220%22 cx=%2221%22 cy=%2220%22 /><circle r=%2245%22 cx=%2270%22 cy=%2270%22 /><circle r=%2230%22 cx=%2250%22 cy=%2250%22 /></g></svg>')] absolute inset-0 animate-subtle-drift bg-[length:100px_100px]"></div>
      </div>

      {children}
    </div>
  );
};

export default AuthLayout;
