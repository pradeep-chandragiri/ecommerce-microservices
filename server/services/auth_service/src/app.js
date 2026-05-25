import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import connectDB from './configs/db.js'
import authRoutes from './routes/auth.routes.js'

// creating app instance
const app = express()
app.use(express.json())
app.use(helmet())
app.use(cookieParser())

// database connection
connectDB()

// health check routes
app.get('/', (req, res) => {
    res.send('Auth API working fine.')
})

// auth routes /register & /login & /logout
app.use('/', authRoutes)

export default app