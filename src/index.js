import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { HelmetProvider } from "react-helmet-async";
import './index.css';
import App from './app/App';


const AppBundle = (
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

window.onload = () => {
  Loadable.preloadReady().then(() => {
    renderMethod(
      AppBundle,
      document.getElementById('root')
    );
  });
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
