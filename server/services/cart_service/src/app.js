import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import connectDB from './configs/db.js'
import cartRoutes from './routes/cart.routes.js'

// creating app instance
const app = express()
app.use(express.json())
app.use(helmet())

// database connection
connectDB()

// health check route
app.get('/', (req, res) => {
    res.send('Cart API working fine!')
})

// cart routes
app.use('/', cartRoutes)

export default app