const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/api', createProxyMiddleware({
  target: 'https://live.devnimble.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api/v1', 
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Authorization', 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn');
  }
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});