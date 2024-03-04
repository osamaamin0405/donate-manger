import { getLang } from "./utils/helpers";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./i18n/en.json";
import ar from "./i18n/ar.json";

i18n.use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en,
            },
            ar: {
                translation: ar
            }
        },
        lng: getLang() ?? 'ar', // if you're using a language detector, do not define the lng option
        fallbackLng: "ar",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
})