import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import type { AbstractIntlMessages } from "next-intl";

// Can be imported from a shared config
const locales = ["en", "th", "zh"];
const defaultLocale = "en"; // It's a good practice to define a default locale

export default getRequestConfig(async ({ requestLocale }) => {
    // next-intl v4: requestLocale is a Promise
    const locale = (await requestLocale) ?? defaultLocale;
    if (!locales.includes(locale)) notFound();

    const common = (await import(`./locales/${locale}/common.json`)).default;
    const home = (await import(`./locales/${locale}/home.json`)).default;
    const docs = (await import(`./locales/${locale}/docs.json`)).default;
    const learn = (await import(`./locales/${locale}/learn.json`)).default;
    const metadata = (await import(`./locales/${locale}/metadata.json`))
        .default;
    const privacyPolicy = (
        await import(`./locales/${locale}/privacy-policy.json`)
    ).default;
    const termsOfService = (
        await import(`./locales/${locale}/terms-of-service.json`)
    ).default;
    const cookies = (await import(`./locales/${locale}/cookies.json`)).default;

    return {
        locale,
        messages: {
            common,
            home,
            docs,
            learn,
            metadata,
            "privacy-policy": privacyPolicy,
            "terms-of-service": termsOfService,
            cookies,
        } as AbstractIntlMessages,
    };
});
