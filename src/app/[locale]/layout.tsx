import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { TailwindIndicator } from "~/components/ui/tailwind-indicator";
import { defaultLocale, type Locale } from "~/i18n";
import { cn } from "~/lib/utils";
import Providers from "~/providers";

import "~/styles/globals.css";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <Providers locale={locale}>
          {children}
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
