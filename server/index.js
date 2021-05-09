import express from "express";
import Loadable from "react-loadable";
import indexController from "./controllers/index";

const compression = require("compression");

const PORT = 3000;

// initialize the application and create the routes
const app = express();

const shouldCompress = (req, res) => {
  if (req.headers["x-no-compression"]) {
    // Will not compress responses, if this header is present
    return false;
  }
  // Resort to standard compression
  return compression.filter(req, res);
};

// Compress all HTTP responses
app.use(
  compression({
    filter: shouldCompress,
    threshold: 0,
  })
);

app.use(indexController);

// start the app
Loadable.preloadAll().then(() => {
  app.listen(PORT, (error) => {
    if (error) {
      return console.log("something bad happened", error);
    }

    console.log("Server is listening on " + PORT + "...");
  });
});
