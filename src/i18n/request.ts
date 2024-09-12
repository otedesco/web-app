import { notFound } from "next/navigation";
import { routing, type Locale } from "./routing";

type getRequestConfig = (params: {
  locale: Locale;
}) => Promise<void | Record<string, unknown>>;

const getRequestConfig: getRequestConfig = async ({ locale }) => {
  if (!routing.locales.includes(locale)) notFound();
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
};

export default getRequestConfig;
