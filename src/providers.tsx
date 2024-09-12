import { ThemeProvider } from "~/components/theme-provider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "~/state/store-provider";
import QueryClientProvider from "./lib/query-client-provider";

const Providers: React.FC<
  React.PropsWithChildren<{
    locale: string;
  }>
> = async (props) => {
  console.log();
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
