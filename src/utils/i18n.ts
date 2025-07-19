import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

i18n.use(HttpApi)
    .use(initReactI18next)
    .init({
        supportedLngs: ["th", "en"],
        fallbackLng: "th",
        ns: ["common", "home"], // Specify namespaces
        defaultNS: "common", // Set a default namespace
        detection: {
            order: ["path", "htmlTag", "cookie", "localStorage", "subdomain"],
            caches: ["cookie"],
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
