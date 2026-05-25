import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import connectDB from './configs/db.js'
import productRoutes from './routes/product.routes.js'

// creating app instance
const app = express()

// built-in & installed middleware
app.use(express.json())
app.use(helmet())

// database connection
connectDB()

// health check route
app.get('/', (req, res) => {
    res.send('Product router working fine!')
})

// product routes
app.use('/', productRoutes)

export default app