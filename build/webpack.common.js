/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-11 13:50:41
 * @LastEditTime: 2022-04-19 14:52:33
 */
const webpack = require("webpack");
// const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { merge } = require("webpack-merge");
const devConfig = require("./webpack.dev.js");
const prodConfig = require("./webpack.prod.js");
const TerserPlugin = require("terser-webpack-plugin");

const commonConfig = {
  entry: {
    main: "./src/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        // exclude: /node_modules/,
        include: path.resolve(__dirname, "../src"),
        loader: "ts-loader",
        // use:["ts-loader", 'eslint-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        generator: {
          filename: "images/[hash][ext]",
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: "./src/styles/variables.scss",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext]",
        },
      },
      {
        test: /\.json$/,
        use: "json-loader",
        include: path.resolve(__dirname, "../src"),
        type: "javascript/auto",
        exclude: /node_modules/,
      },
      {
        test: /\.wasm$/,
        type: "webassembly/async",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".wasm"],
    alias: {
      "react/jsx-runtime": require.resolve("react/jsx-runtime"),
    },
    fallback: {
      // fs: false,
      // module: false,
      os: require.resolve("os-browserify/browser"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      // assert: require.resolve("assert/"),
      // crypto: require.resolve("crypto-browserify"),
      // path: require.resolve("path-browserify"),
      // //   url: require.resolve('url'),
      // // buffer: require.resolve('buffer/'),
      // //   util: require.resolve('util/'),
      // stream: require.resolve("stream-browserify/"),
      // // vm: require.resolve('vm-browserify')
      // http: false,
      // https:false,
      // os: false,
      crypto: require.resolve("crypto-browserify"),
      // path: require.resolve('path-browserify'),
      //   url: require.resolve('url'),
      buffer: require.resolve("buffer/"),
      //   util: require.resolve('util/'),
      stream: require.resolve("stream-browserify/"),
      // vm: require.resolve('vm-browserify')
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/images/favicon.ico",
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
    //   new CopyPlugin({
    //     patterns: [
    //       { from: "src/project-conf.js", to: "project-conf.js" },
    //     ],
    // }),
  ],
  output: {
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendors",
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        test: /\.ts(\?.*)?$/i, //匹配参与压缩的文件
        parallel: true, //使用多进程并发运行
        terserOptions: {
          //Terser 压缩配置
          output: { comments: false },
        },
        extractComments: true,
      }),
    ],
  },
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  },
};

module.exports = (env) => {
  if (env.production) {
    return merge(commonConfig, prodConfig);
  } else {
    return merge(commonConfig, devConfig);
  }
};
