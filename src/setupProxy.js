const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
module.exports = (app) => {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/file', {
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    );

};