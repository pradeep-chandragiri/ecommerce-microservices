import { createProxyMiddleware } from 'http-proxy-middleware'


export const authProxy = createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URI,
    changeOrigin: true,
    pathRewrite: {
        '^/auth': ''
    }
})

export const userProxy = createProxyMiddleware({
    target: process.env.USER_SERVICE_URI,
    changeOrigin: true,
    pathRewrite: {
        '^/users': ''
    },
    on: {
        proxyReq: (proxyReq, req, res) => {
            if (req.user) {
                proxyReq.setHeader('x-user-id', req.user.id)
                proxyReq.setHeader('x-user-email', req.user.email)
                proxyReq.setHeader('x-user-role', req.user.role)
            }
        }
    }
})

export const productProxy = createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URI,
    changeOrigin: true,
    pathRewrite: {
        '^/products': ''
    },
    on: {
        proxyReq: (proxyReq, req, res) => {
            if (req.user) {
                proxyReq.setHeader('x-user-id', req.user.id)
                proxyReq.setHeader('x-user-email', req.user.email)
                proxyReq.setHeader('x-user-role', req.user.role)
            }
        }
    }
})

export const cartProxy = createProxyMiddleware({
    target: process.env.CART_SERVICE_URI,
    changeOrigin: true,
    pathRewrite: {
        '^/cart': ''
    },
    on: {
        proxyReq: (proxyReq, req, res) => {
            if (req.user) {
                proxyReq.setHeader('x-user-id', req.user.id)
                proxyReq.setHeader('x-user-email', req.user.email)
                proxyReq.setHeader('x-user-role', req.user.role)
            }
        }
    }
})

export const orderProxy = createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URI,
    changeOrigin: true,
    pathRewrite: {
        '^/orders': ''
    },
    on: {
        proxyReq: (proxyReq, req, res) => {
            if (req.user) {
                proxyReq.setHeader('x-user-id', req.user.id)
                proxyReq.setHeader('x-user-email', req.user.email)
                proxyReq.setHeader('x-user-role', req.user.role)
            }
        }
    }
})