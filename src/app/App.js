import React, { useEffect } from "react";
import Loadable from "react-loadable";
import { NavLink, withRouter, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { I18Provider, LOCALES, DEFAULT_LOCALE } from "./i18n";
import { setMessage } from "./store/appReducer";
import SEO from "./components/Seo";
import AppRoutes from "./app.routes";
import "./App.css";

const AsyncComponent = Loadable({
  loader: () => import("./components/SomeComponent"),
  loading: () => <div>loading...</div>,
});

function App({ history, ...props }) {
  const match = useRouteMatch();

  const { locale } = match.params;
  console.log(locale, match);

  if (!Object.values(LOCALES).includes(locale)) {
    history.push(`/${DEFAULT_LOCALE}`);
  }

  useEffect(() => {
    if (!props.message) {
      props.updateMessage("Hi, I'm from client!");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <I18Provider locale={locale}>
      <SEO title="Home Page" />
      <div className="App">
        <header className="App-header">
          <img
            src="/assets/images/logo.svg"
            className="App-logo"
            alt="logo"
            width="200"
            height="200"
          />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="App-intro">
          <h2>Part Test Translation (react-intl)</h2>
          <h3>
            <FormattedMessage id="heading" />
          </h3>

          <hr />

          <h2>Part 1: Async component</h2>
          <AsyncComponent />

          <hr />

          <h2>Part 2: Redux store</h2>
          <p>Redux: {props.message}</p>

          <hr />

          <h2>Part 3: React router</h2>
          <nav>
            <NavLink to={`${match.url}`} exact activeClassName="active">
              Home
            </NavLink>
            <NavLink to={`${match.url}/another`} activeClassName="active">
              Another page
            </NavLink>
            <NavLink to={`${match.url}/another/child`} activeClassName="active">
              Another page CHild
            </NavLink>
          </nav>
          <AppRoutes />
        </div>
      </div>
    </I18Provider>
  );
}

export default withRouter(
  connect(
    ({ app }) => ({
      message: app.message,
    }),
    (dispatch) => ({
      updateMessage: (messageText) => dispatch(setMessage(messageText)),
    })
  )(App)
);
