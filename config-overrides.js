const webpack = require("webpack");
const path = require("path");

module.exports = function override(config) {
  const fallback = {
    ...config.resolve.fallback, // 기존 fallback 유지
    querystring: require.resolve("querystring-es3"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    fs: false,
    vm: false,
  };

  config.resolve = {
    ...config.resolve,
    fallback, // 새 fallback으로 덮어쓰기
    alias: {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    },
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  return config;
};
