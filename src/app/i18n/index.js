import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import CONFIG from "../config";
import RESOURCES from "./resources";

i18next
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    react: {
      useSuspense: true,
    },
    supportedLngs: CONFIG.locales,
    fallbackLng: CONFIG.defaultLocale,
    lng: CONFIG.defaultLocale,
    debug: CONFIG.isDevelopment,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    resources: RESOURCES,
  });

export default i18next;
