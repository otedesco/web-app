import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { getLocale } from "next-intl/server";
import { MainFooter } from "~/components/footer";

import { MainNav, MobileMenu } from "~/components/navigation-menu";
import { Toaster } from "~/components/ui/sonner";
import { TailwindIndicator } from "~/components/ui/tailwind-indicator";

import { cn } from "~/lib/utils";
import Providers from "~/providers";

import "~/styles/globals.css";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <Providers locale={locale}>
          <div className="flex min-h-screen flex-col">
            <MainNav />
            {props.children}
            <MainFooter className="mb-8 md:mb-0" />
            <MobileMenu />
          </div>
          <Toaster />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
