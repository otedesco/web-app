import { ThemeProvider } from "~/components/theme-provider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "~/state/store-provider";
import QueryClientProvider from "~/lib/react-query";

const Providers: React.FC<
  React.PropsWithChildren<{
    locale: string;
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
            {props.children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
};

export default Providers;
