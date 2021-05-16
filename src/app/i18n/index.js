import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { LOCALES, DEFAULT_LOCALE } from "./locales";
import RESOURCES from "./resources";

i18next
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    react: {
      wait: true,
    },
    supportedLngs: LOCALES,
    fallbackLng: DEFAULT_LOCALE,
    lng: "ar",
    debug: process.env.NODE_ENV === "development",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    resources: RESOURCES,
  });

export default i18next;
