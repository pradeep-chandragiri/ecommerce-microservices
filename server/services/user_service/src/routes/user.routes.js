import express from 'express'
import { createUser, getUser, updateUser } from '../controllers/user.controller.js'
import { internalKeyCheck } from '../middlewares/internal.middleware.js'

const authRoutes = express.Router()

authRoutes.post('/create', internalKeyCheck ,createUser)
authRoutes.get('/get', getUser)
authRoutes.put('/update', updateUser)

export default authRoutes