import React from "react";
import { Redirect } from "react-router-dom";
import CONFIG from "src/app/config";
import i18n from "src/app/i18n";
import App from "src/app/App";

const LocaleRoute = (props) => {
  const { match, location } = props;
  const { locale, country } = match.params;

  if (!Object.values(CONFIG.locales).includes(locale)) {
    return (
      <Redirect
        to={{
          pathname: `/${country}/${CONFIG.defaultLocale}${location.state.from.pathname}`,
          state: { from: location },
        }}
      />
    );
  }

  // Check Route locale
  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  return <App {...props} />;
};

export default LocaleRoute;
