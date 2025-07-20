import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import type { AbstractIntlMessages } from "next-intl";

// Can be imported from a shared config
const locales = ["en", "th", "zh", "ja"];
const defaultLocale = "en"; // It's a good practice to define a default locale

export default getRequestConfig(async ({ locale: requestLocale }) => {
    // Validate that the incoming `locale` parameter is valid
    const locale = requestLocale || defaultLocale;
    if (!locales.includes(locale)) notFound();

    return {
        locale,
        messages: {
            ...(await import(`./locales/${locale}/common.json`)).default,
            ...(await import(`./locales/${locale}/home.json`)).default,
            ...(await import(`./locales/${locale}/docs.json`)).default,
            ...(await import(`./locales/${locale}/learn.json`)).default,
            ...(await import(`./locales/${locale}/privacy-policy.json`))
                .default,
            ...(await import(`./locales/${locale}/terms-of-service.json`))
                .default,
        } as AbstractIntlMessages,
    };
});
