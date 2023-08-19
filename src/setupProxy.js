const { createProxyMiddleware } = require("http-proxy-middleware");

const baseURL = {
  target: process.env.REACT_APP_BASE_URL || "",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
};

const proxyWilayah = {
  target: process.env.REACT_APP_API_WILAYAH || "",
  changeOrigin: true,
  pathRewrite: {
    "^/api-wilayah": "",
  },
};

module.exports = function (app) {
  app.use("/api", createProxyMiddleware(baseURL));
  app.use("/api-wilayah", createProxyMiddleware(proxyWilayah));
};
