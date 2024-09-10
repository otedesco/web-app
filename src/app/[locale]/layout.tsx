import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cn } from "~/lib/utils";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });

  return (
    // <html lang={locale}>
    //   <body
    //     className={cn(
    //       "min-h-screen bg-background font-sans text-foreground antialiased",
    //       GeistSans.variable,
    //       GeistMono.variable,
    //     )}
    //   >
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
    //   </body>
    // </html>
  );
}
