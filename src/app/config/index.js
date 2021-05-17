const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const CONFIG = {
  isProduction,
  isDevelopment,
  baseURL: "/",

  // For http API's
  http: {
    baseURL: isDevelopment
      ? "http://localhost:7003/api"
      : "https://work-api.xiejiahe.com/api",
  },

  // Locales
  locales: ["en", "ar"],
  defaultLocale: "en",

  // Countries
  countries: ["ae"],
  defaultCountry: "ae",
};

export default CONFIG;
