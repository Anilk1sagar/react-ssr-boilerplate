require("ignore-styles");
require("url-loader");
require("file-loader");
const path = require("path");
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
  ],
});
require("./index");
