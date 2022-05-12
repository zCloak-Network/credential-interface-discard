const webpack = require('webpack');
const path = require("path");
const addRewireScssLoader = require("react-app-rewire-scss-loaders");


module.exports = function override(config, env) {

    
    config = addRewireScssLoader("sass-resources-loader", {
        resources: path.resolve(__dirname, "variables.scss"),
      })(config, env);


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
  

    
    return config;
}