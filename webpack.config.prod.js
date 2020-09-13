const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "production",
  target: "node",
  externals: [nodeExternals()],
  watch: true,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  entry: {
    src: "./src/app.ts",
    abc: "./src/abc.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contentHash].js",
    publicPath: path.resolve(__dirname, "dist/static"),
    chunkFilename: "[name].[contentHash].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    runtimeChunk: {
      name: "runtime",
    },
    namedChunks: true,
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/public/index.html"),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      { test: /\.css$/, use: "css-loader" },
      { test: /\.ts$/, use: "ts-loader" },
    ],
  },
};
