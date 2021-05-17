import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CONFIG from "./config";
import CountryRoute from "./components/CountryRoute";

const AppWrapper = () => {
  return (
    <Switch>
      <Route path="/:country" component={CountryRoute} />
      <Redirect to={`/${CONFIG.defaultCountry}`} />
    </Switch>
  );
};

export default AppWrapper;
