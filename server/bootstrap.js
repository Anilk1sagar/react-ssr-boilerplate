const path = require("path");

require("url-loader");
require("file-loader");

// Babel Configs
require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "syntax-dynamic-import",
    "dynamic-import-node",
    "react-loadable/babel",
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        alias: {
          src: path.resolve(__dirname, "..", "src"),
        },
      },
    ],
    [
      "babel-plugin-transform-import-ignore",
      {
        patterns: [".css", ".scss"],
      },
    ],
  ],
});

// Ignore styles for server
require("ignore-styles");

// Run Server
require("./index");
