import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { LOCALES, DEFAULT_LOCALE } from "./locales";
import RESOURCES from "./resources";

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    supportedLngs: LOCALES,
    fallbackLng: DEFAULT_LOCALE,
    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: RESOURCES,
  });

export default i18n;
