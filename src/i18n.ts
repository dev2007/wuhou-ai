import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const cookieLocale = cookieStore.get("locale");
  const locale = cookieLocale?.value || "zh";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
