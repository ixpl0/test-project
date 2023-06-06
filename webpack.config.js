const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "main.js",
    clean: true,
  },
};
