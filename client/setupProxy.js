const { createProxyMiddleware } = require('http-proxy-middleware');

let appURI = null

    if (process.env.NODE_ENV === "production"){
        appURI = process.env.REACT_APP_URL_PRODUCTION
    } else {
        appURI = process.env.REACT_APP_URL_DEVELOPMENT
    }

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: appURI,
            changeOrigin: true,
        })
    );
};