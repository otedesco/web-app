/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  let locale = cookies().get("NEXT_LOCALE")?.value ?? "en";
  const acceptLanguageHeader = headers().get("accept-language");
  if (acceptLanguageHeader?.toLowerCase().includes("es")) {
    locale = "es";
  }

  let messages;
  try {
    messages = (
      (await import(`../../messages/${locale}.json`)) as Record<string, any>
    ).default;
  } catch (_error) {
    messages = (await import(`../../messages/en.json`)).default;
  }
  return {
    locale,
    messages,
  };
});
