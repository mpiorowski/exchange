const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  // app.use(createProxyMiddleware('/api', {target: 'http://api.nbp.pl/', changeOrigin: true,}));
  app.use(createProxyMiddleware('/api', {target: 'http://localhost:9000/',}));
};
