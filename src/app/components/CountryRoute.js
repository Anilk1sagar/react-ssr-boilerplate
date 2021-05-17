import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CONFIG from "src/app/config";
import LocaleRoute from "./LocaleRoute";

const CountryRoute = (props) => {
  const { match, location } = props;
  const { country } = match.params;

  if (!Object.values(CONFIG.countries).includes(country)) {
    return (
      <Redirect
        to={{
          pathname: `/${CONFIG.defaultCountry}/${country}`,
          state: { from: location },
        }}
      />
    );
  }

  return (
    <Switch>
      <Route path={`${match.path}/:locale`} component={LocaleRoute} />
      <Redirect to={`${match.path}/${CONFIG.defaultLocale}`} />
    </Switch>
  );
};

export default CountryRoute;
