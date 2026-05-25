import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import orderRoutes from './routes/order.routes.js'

// creating app instance
const app = express()

// in-built middleware
app.use(express.json())
app.use(helmet())

// health check route
app.get('/', (req, res) => {
    res.send('Order API working fine!')
})

// order routes
app.use('/', orderRoutes)

export default app