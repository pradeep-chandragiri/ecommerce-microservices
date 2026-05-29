import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { authProxy, cartProxy, orderProxy, productProxy, userProxy } from './routes/proxyRoutes.js'
import { authMiddleware } from './middlewares/auth.middleware.js'
import { optionalMiddleware } from './middlewares/optional.middleware.js'

// creating app instance
const app = express()
app.use(helmet())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

// health check routes
app.get('/', (req, res) => {
    res.send('Gatewar Working Fine!')
})

// proxy public routes
app.use('/auth', authProxy)
app.use('/products', optionalMiddleware, productProxy)

// proxy protect routes
app.use('/users', authMiddleware,  userProxy)
app.use('/cart', authMiddleware, cartProxy)
app.use('/orders', authMiddleware, orderProxy)

export default app