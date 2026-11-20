import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // During static export, requestLocale may not be available
  // Fall back to default locale
  let locale = await requestLocale;

  if (!locale) {
    locale = routing.defaultLocale;
  }

  // Ensure that a valid locale is used
  if (!routing.locales.includes(locale as "zh" | "en")) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
