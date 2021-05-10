import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LOCALES, DEFAULT_LOCALE } from "./i18n/locales";
import App from "./App";

const AppWrapper = () => {
  return (
    <Switch>
      <Route
        path="/:locale"
        render={(props) => {
          const { locale } = props.match.params;
          if (Object.values(LOCALES).includes(locale)) {
            return <App {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: `/${DEFAULT_LOCALE}`,
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
      <Redirect to={`/${DEFAULT_LOCALE}`} />
    </Switch>
  );
};

export default AppWrapper;
