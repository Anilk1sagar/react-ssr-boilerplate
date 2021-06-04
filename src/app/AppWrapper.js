import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import CONFIG from "./config";
import CountryRoute from "./components/CountryRoute";

const AppWrapper = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Switch>
        <Route path="/:country" component={CountryRoute} />
        <Redirect to={`/${CONFIG.defaultCountry}`} />
      </Switch>
    </I18nextProvider>
  );
};

export default AppWrapper;
