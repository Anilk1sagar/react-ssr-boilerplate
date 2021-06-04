import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Loadable from "react-loadable";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./app/store/configureStore";
import "./index.css";
import AppWrapper from "./app/AppWrapper";

const store = configureStore(window.__REDUX_STATE__ || {});

const AppBundle = (
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <AppWrapper />
        </HelmetProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

window.onload = () => {
  Loadable.preloadReady().then(() => {
    renderMethod(AppBundle, document.getElementById("root"));
  });
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
