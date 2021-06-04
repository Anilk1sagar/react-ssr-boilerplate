const path = require("path");
const glob = require("glob-all");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "src"),
};

const LOG_WEBPACK_CONFIG = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
    if (pluginOptions.log) {
      console.log("Webpack configs: ", webpackConfig);
    }
    return webpackConfig;
  },
};

module.exports = {
  webpack: {
    configure: {
      optimization: {
        minimizer: [new UglifyJsPlugin({ sourceMap: true, parallel: true })],
      },
      module: {
        rules: [],
      },
    },
    plugins: {
      add: [
        new BundleAnalyzerPlugin({ generateStatsFile: true }),
        new PurgecssPlugin({
          paths: [
            "public/index.html",
            ...glob.sync(`${PATHS.src}/**/**/*`, { nodir: true }),
          ],
        }),
      ],
      remove: [],
    },
  },

  // Craco Plugins
  plugins: [
    {
      plugin: LOG_WEBPACK_CONFIG,
      options: { log: false },
    },
  ],
};
