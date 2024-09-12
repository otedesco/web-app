import { ThemeProvider } from "~/components/theme-provider";
import { getMessages } from "next-intl/server";
import { type Locale } from "./i18n";
import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "~/state/store-provider";
import QueryClientProvider from "./lib/query-client-provider";

const Providers: React.FC<
  React.PropsWithChildren<{
    locale: Locale;
  }>
> = async (props) => {
  const messages = await getMessages({ locale: props.locale });
  return (
    <StoreProvider>
      <QueryClientProvider>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <HistoryManagerProvider> */}
            {props.children}
            {/* </HistoryManagerProvider> */}
          </ThemeProvider>
        </NextIntlClientProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
};

export default Providers;
