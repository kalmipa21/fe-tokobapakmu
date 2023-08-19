const { createProxyMiddleware } = require("http-proxy-middleware");

const baseURL = {
  target: "https://be-server.vercel.app/api/v1/",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
};

const proxyWilayah = {
  target: "http://www.emsifa.com/api-wilayah-indonesia/api",
  changeOrigin: true,
  pathRewrite: {
    "^/api-wilayah": "",
  },
};

module.exports = function (app) {
  app.use("/api", createProxyMiddleware(baseURL));
  app.use("/api-wilayah", createProxyMiddleware(proxyWilayah));
};
