import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import type { AbstractIntlMessages } from "next-intl";

// Can be imported from a shared config
const locales = ["en", "th", "zh"];
const defaultLocale = "th"; // Thai is now the default locale

export default getRequestConfig(async ({ requestLocale }) => {
    // next-intl v4: requestLocale is a Promise
    const locale = (await requestLocale) ?? defaultLocale;
    if (!locales.includes(locale)) notFound();

    const [
        common,
        home,
        docs,
        learn,
        metadata,
        privacyPolicy,
        termsOfService,
        cookies,
    ] = await Promise.all([
        import(`./locales/${locale}/common.json`),
        import(`./locales/${locale}/home.json`),
        import(`./locales/${locale}/docs.json`),
        import(`./locales/${locale}/learn.json`),
        import(`./locales/${locale}/metadata.json`),
        import(`./locales/${locale}/privacy-policy.json`),
        import(`./locales/${locale}/terms-of-service.json`),
        import(`./locales/${locale}/cookies.json`),
    ]);

    return {
        locale,
        messages: {
            common: common.default,
            home: home.default,
            docs: docs.default,
            learn: learn.default,
            metadata: metadata.default,
            "privacy-policy": privacyPolicy.default,
            "terms-of-service": termsOfService.default,
            cookies: cookies.default,
        } as AbstractIntlMessages,
    };
});
