import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Viewport } from "next";
import { getLocale } from "next-intl/server";
import { MainFooter } from "~/components/footer";

import { MainNav, MobileMenu } from "~/components/navigation-menu";
import { Toaster } from "~/components/ui/sonner";
import { TailwindIndicator } from "~/components/ui/tailwind-indicator";
import { GOOGLE_MAPS_API_KEY } from "~/config/constants";

import { cn } from "~/lib/utils";
import Providers from "~/providers";
import localFont from "next/font/local";

import "~/styles/globals.css";

const soehneMono = localFont({
  src: "../../public/fonts/soehne-mono-web-buch.woff",
  variable: "--soehne-mono",
});
const untitledSansMedium = localFont({
  src: "../../public/fonts/UntitledSansWeb-Medium.woff",
  variable: "--font-untitledsans-medium",
});
const untitledsSansRegular = localFont({
  src: "../../public/fonts/UntitledSansWeb-Regular.woff",
  variable: "--font-untitledsans-regular",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`}
          async
          defer
        ></script>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          soehneMono.variable,
          untitledSansMedium.variable,
          untitledsSansRegular.variable,
        )}
      >
        <Providers locale={locale}>
          <MainNav />
          {props.children}
          <MainFooter className="relative mb-8 md:mb-0" />
          <MobileMenu />
          <Toaster />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
