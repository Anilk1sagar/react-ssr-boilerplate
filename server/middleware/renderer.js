import React from "react";
import ReactDOMServer from "react-dom/server";
import Loadable from "react-loadable";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";

// import our main App component
import AppWrapper from "../../src/app/AppWrapper";

// import the manifest generated with the create-react-app build
import manifest from "../../build/asset-manifest.json";

// function to extract js assets from the manifest
const extractAssets = (assets, chunks) =>
  Object.keys(assets)
    .filter((asset) => chunks.indexOf(asset.replace(".js", "")) > -1)
    .map((k) => assets[k]);

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

    const modules = [];
    const routerContext = {};
    const helmetContext = {};

    // render the app as a string
    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={(m) => modules.push(m)}>
        <ReduxProvider store={store}>
          <StaticRouter location={req.baseUrl} context={routerContext}>
            <HelmetProvider context={helmetContext}>
              <AppWrapper />
            </HelmetProvider>
          </StaticRouter>
        </ReduxProvider>
      </Loadable.Capture>
    );

    // get the stringified state
    const reduxState = JSON.stringify(store.getState());

    // map required assets to script tags
    const extraChunks = extractAssets(manifest, modules).map(
      (c) => `<script type="text/javascript" src="/${c}" defer></script>`
    );

    // get HTML headers
    const { helmet } = helmetContext;

    // now inject the rendered app into our html and send it to the client
    return res.send(
      htmlData
        // write the React app
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        // write the string version of our state
        .replace("__REDUX_STATE__={}", `__REDUX_STATE__=${reduxState}`)
        // append the extra js assets
        .replace("</body>", extraChunks.join("") + "</body>")
        // write the HTML header tags
        .replace(
          /<title>(.*?)<\/title>/g,
          helmet.title.toString() + helmet.meta.toString()
        )
    );
  });
};

export default Renderer;
