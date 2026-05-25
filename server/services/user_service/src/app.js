import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import connectDB from './configs/db.js'
import authRoutes from './routes/user.routes.js'

// creating app instance
const app = express()
app.use(express.json())
app.use(helmet())

// database connection
connectDB()

// health check route
app.get('/', (req, res) => {
    res.send('User API working fine!')
})

// user routes
app.use('/', authRoutes)

export default app