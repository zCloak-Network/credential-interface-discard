/*
 * @Description: webpack prod config
 * @Author: lixin
 * @Date: 2021-08-11 11:56:53
 * @LastEditTime: 2022-01-05 14:20:44
 */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const prodConfig = {
  mode: "production",
  // devtool: 'cheap-module-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css",
      ignoreOrder: false,
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
  },
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
};

module.exports = prodConfig;
