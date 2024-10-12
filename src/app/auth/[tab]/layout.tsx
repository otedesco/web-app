// import React from "react";
// import GlowEffect from "~/components/glow-effect";
// import { Card } from "~/components/ui";

// const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
//   return (
//     <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-2 sm:p-4">
//       <div className="group relative">
//         <GlowEffect />
//         <Card className="relative z-50 w-full overflow-hidden sm:max-w-md">
//           {children}
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;

// const GrainFilter: React.FC<React.PropsWithChildren> = ({ children }) => {
//   return (

//   );
// };

"use client";
import { Card } from "~/components/ui";
import bg from "../../../../public/dark-mode-login-bg.svg";
import BrandLogo from "~/components/brand-logo";

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid min-h-screen min-w-full grid-flow-col grid-cols-5 place-items-center gap-5 p-3">
      <div
        style={{
          backgroundImage: `url(${bg.src})`,
          // backgroundPosition: "25% 75%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="relative -z-20 col-span-3 h-full w-full content-end rounded-3xl"
      >
        <div className="bg-noise-bg absolute -inset-1 -z-10 rounded-lg opacity-70" />
        <Card className="mx-auto flex max-w-sm flex-col items-center justify-center border-none bg-transparent px-6 py-12">
          <BrandLogo variant="full" dynamic gradient />
          <div className="my-4 text-center">
            <h3 className="text-4xl font-medium text-primary">
              Get started with us
            </h3>
            <p className="text-primary">
              Complete these easy steps to register your account
            </p>
          </div>
          <div className="my-4 grid w-full grid-cols-1 gap-4">
            <div className="flex flex-row items-center gap-2 rounded-xl bg-primary p-5 font-semibold text-primary-foreground">
              <span className="rounded-full bg-primary-foreground px-2 text-primary">
                1
              </span>
              <p className="px-2 font-semibold">Sign up your account</p>
            </div>
            <div className="flex flex-row items-center gap-2 rounded-xl bg-secondary p-5 font-semibold text-primary backdrop-blur-xl">
              <span className="rounded-full bg-neutral-600 px-2 text-primary">
                2
              </span>
              <p className="px-2 font-semibold">Set up your profile</p>
            </div>
            <div className="flex flex-row items-center gap-2 rounded-xl bg-secondary p-5 font-semibold text-primary backdrop-blur-xl">
              <span className="rounded-full bg-neutral-600 px-2 text-primary">
                3
              </span>
              <p className="px-2 font-semibold">Validate your email</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="h-full w-full"></div>
    </div>
  );
};

export default AuthLayout;
