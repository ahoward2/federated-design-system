const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const { camelCase } = require("camel-case");
const { merge } = require("webpack-merge");

const pkg = require("./package.json");
const name = camelCase(pkg.name);

const deps = require("./package.json").dependencies;

const baseConfig = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".md"],
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx$/,
        loader: "esbuild-loader",
        options: {
          loader: "jsx",
          target: "es2015",
        },
      },
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2015",
        },
      },
    ],
  },
};

const browserConfig = {
  output: {
    path: path.resolve("./dist/browser"),
  },
  plugins: [
    new ModuleFederationPlugin({
      name,
      filename: "remote-entry.js",
      remotes: {},
      exposes: {
        "./ThemeToggle": "./src/components/ThemeToggle",
        "./GlobalStyle": "./src/styles/global",
        "./ThemeContext": "./src/context/ThemeContext",
        "./darkTheme": "./src/styles/themes",
        "./lightTheme": "./src/styles/themes",
        "./useThemeMode": "./src/util/hooks/useThemeMode",
      },
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

const nodeConfig = {
  output: {
    path: path.resolve("./dist/node"),
  },
  plugins: [
    new ModuleFederationPlugin({
      name,
      filename: "remote-entry.js",
      library: { type: "commonjs" },
      remotes: {},
      exposes: {
        "./ThemeToggle": "./src/components/ThemeToggle",
        "./GlobalStyle": "./src/styles/global",
        "./ThemeContext": "./src/context/ThemeContext",
        "./darkTheme": "./src/styles/themes",
        "./lightTheme": "./src/styles/themes",
        "./useThemeMode": "./src/util/hooks/useThemeMode",
      },
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

module.exports = [
  merge(baseConfig, browserConfig),
  merge(baseConfig, nodeConfig),
];
