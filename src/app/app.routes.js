import React from "react";
import Loadable from "react-loadable";
import { Route, Switch } from "react-router-dom";

const AsyncPageDefault = Loadable({
  loader: () =>
    import(/* webpackChunkName: "PageDefault" */ "./pages/PageDefault"),
  loading: () => <div>loading page...</div>,
  modules: ["PageDefault"],
});

const AsyncPageAnother = Loadable({
  loader: () =>
    import(/* webpackChunkName: "PageAnother" */ "./pages/PageAnother"),
  loading: () => <div>loading another page...</div>,
  modules: ["PageAnother"],
});

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"),
  loading: () => <div>loading page not found...</div>,
  modules: ["NotFound"],
});

const AppRoutes = () => {
  return (
    <Switch>
      <Route path={`/another`} component={AsyncPageAnother} />
      <Route path={`/`} component={AsyncPageDefault} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRoutes;
