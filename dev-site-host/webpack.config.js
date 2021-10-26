const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { camelCase } = require("camel-case");

const federatedRemotes = {
  "dev-profile-components": "^0.0.1",
};

const localRemotes = {
  "dev-site-components": `${camelCase(
    "dev-site-components"
  )}@http://localhost:3003/browser/remote-entry.js`,
};

const deps = {
  ...federatedRemotes,
  ...require("./package.json").dependencies,
};

// const unpkgRemote = (name) =>
//   `${camelCase(name)}@https://unpkg.com/${name}@${
//     deps[name]
//   }/dist/browser/remote-entry.js`;

// const remotes = Object.keys(federatedRemotes).reduce(
//   (remotes, lib) => ({
//     ...remotes,
//     [lib]: unpkgRemote(lib),
//   }),
//   {}
// );

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3002,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // If you're only making use of a dynamic remote container,
    // you actually wouldn't NEED the module federation plugin.
    new ModuleFederationPlugin({
      name: "dev-site-host",
      remotes:
        /* process.env.LOCAL_MODULES === "true" ? */ localRemotes /*: remotes,*/,
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "styled-components": {
          singleton: true,
          requiredVersion: deps["styled-components"],
        },
      },
    }),
  ],
};
