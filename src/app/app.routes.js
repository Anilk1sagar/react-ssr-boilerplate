import React from "react";
import Loadable from "react-loadable";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const AsyncPageDefault = Loadable({
  loader: () => import("./pages/PageDefault"),
  loading: () => <div>loading page...</div>,
});

const AsyncPageAnother = Loadable({
  loader: () => import("./pages/PageAnother"),
  loading: () => <div>loading another page...</div>,
});

const NotFound = Loadable({
  loader: () => import("./pages/NotFound"),
  loading: () => <div>loading page not found...</div>,
});

const AppRoutes = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/another`} component={AsyncPageAnother} />
      <Route exact path={`${match.path}`} component={AsyncPageDefault} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRoutes;
