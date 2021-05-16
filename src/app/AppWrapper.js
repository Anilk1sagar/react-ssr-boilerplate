import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LOCALES, DEFAULT_LOCALE } from "./i18n/locales";
import i18n from "./i18n";
import App from "./App";

const LocaleRoute = (props) => {
  const { match, location } = props;
  const { locale } = match.params;

  if (!Object.values(LOCALES).includes(locale)) {
    return (
      <Redirect
        to={{
          pathname: `/${DEFAULT_LOCALE}${match.url}`,
          state: {
            from: location,
          },
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

const AppWrapper = () => {
  return (
    <Switch>
      <Route path="/:locale" component={LocaleRoute} />
      <Redirect to={`/${DEFAULT_LOCALE}`} />
    </Switch>
  );
};

export default AppWrapper;
