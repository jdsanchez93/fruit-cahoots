const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5075',
        })
    );

    app.use(
        '/chatHub',
        createProxyMiddleware('/chatHub', {
            target: 'http://localhost:5075',
            ws: true,
        })
    );
};