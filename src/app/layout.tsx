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
  weight: "700",
  style: "normal",
  variable: "--soehne-mono",
});
const untitledSans = localFont({
  src: [
    {
      path: "../../public/fonts/UntitledSans-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/UntitledSans-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../public/fonts/UntitledSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/UntitledSans-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/UntitledSans-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/UntitledSans-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/UntitledSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/UntitledSans-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/UntitledSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/UntitledSans-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-untitledsans",
});

const untitledSerif = localFont({
  src: [
    {
      path: "../../public/fonts/UntitledSerif-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/UntitledSerif-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/UntitledSerif-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/UntitledSerif-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/UntitledSerif-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/UntitledSerif-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-untitledserif",
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
          untitledSans.variable,
          untitledSerif.variable,
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
