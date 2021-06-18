import React from "react";
import ReactDOMServer from "react-dom/server";
import Loadable from "react-loadable";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import App from "../../src/app/App";
import { AttachChunksToHtml } from "../helpers";

const path = require("path");
const fs = require("fs");

const Renderer = (store) => (req, res, next) => {
  // get the html file created with the create-react-app build
  const filePath = path.resolve(__dirname, "..", "..", "build", "index.html");

  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("err", err);
      return res.status(404).end();
    }

    const modules = new Set();
    const routerContext = {};
    const helmetContext = {};

    // render the app as a string
    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={(moduleName) => modules.add(moduleName)}>
        <ReduxProvider store={store}>
          <StaticRouter location={req.baseUrl} context={routerContext}>
            <HelmetProvider context={helmetContext}>
              <App />
            </HelmetProvider>
          </StaticRouter>
        </ReduxProvider>
      </Loadable.Capture>
    );

    // get the stringified state
    const reduxState = JSON.stringify(store.getState());

    // get HTML headers
    const { helmet } = helmetContext;

    // Attaching all bundles of css and js to html
    htmlData = AttachChunksToHtml(htmlData, Array.from(modules));

    // now inject the rendered app into our html and send it to the client
    return res.send(
      htmlData
        // write the React app
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        // write the string version of our state
        .replace("__REDUX_STATE__={}", `__REDUX_STATE__=${reduxState}`)
        // write the HTML header tags
        .replace(
          /<title>(.*?)<\/title>/g,
          helmet.title.toString() + helmet.meta.toString()
        )
    );
  });
};

export default Renderer;
