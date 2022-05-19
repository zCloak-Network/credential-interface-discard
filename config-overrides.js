/*
 * @Description: 
 * @Author: lixin
 * @Date: 2022-05-11 17:03:00
 * @LastEditTime: 2022-05-18 16:59:02
 */
const webpack = require('webpack');
const path = require("path");
const addRewireScssLoader = require("react-app-rewire-scss-loaders");


module.exports = function override(config, env) {
      const fallback = config.resolve.fallback || {};
      Object.assign(fallback, {
          "crypto": require.resolve("crypto-browserify"),
          "stream": require.resolve("stream-browserify"),
          "assert": require.resolve("assert"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "os": require.resolve("os-browserify"),
          "url": require.resolve("url")
      })
      config.resolve.fallback = fallback;
      config.plugins = (config.plugins || []).concat([
          new webpack.ProvidePlugin({
              process: 'process/browser.js',
              Buffer: ['buffer', 'Buffer']
          })
      ]);

      config = addRewireScssLoader("sass-resources-loader", {
        resources: path.resolve(__dirname, "./src/styles/variables.scss"),
      })(config, env);


      // Fix: @kiltprotocol/sdk-js
      // TypeError: _jsonabc_cjs__WEBPACK_IMPORTED_MODULE_1__.sortObj is not a function

      const fileLoaderRule = getFileLoaderRule(config.module.rules);
      if(!fileLoaderRule) {
          throw new Error("File loader not found");
      }
      fileLoaderRule.exclude.push(/\.cjs$/);
  
    return config;
}

function getFileLoaderRule(rules) {
    for(const rule of rules) {
        if("oneOf" in rule) {
            const found = getFileLoaderRule(rule.oneOf);
            if(found) {
                return found;
            }
        } else if(rule.test === undefined && rule.type === 'asset/resource') {
            return rule;
        }
    }
}