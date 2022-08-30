let { createProxyMiddleware } = require('http-proxy-middleware');

// 服务发现示例本地代理
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/serviceDiscovery', {
            target: 'http://10.10.2.61:8888',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                '^/serviceDiscovery': '/',
            },
        })
    );
};
