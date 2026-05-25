import express from 'express'
import { createOrder, getOrder, getUserOrders, updateOrderStatus } from '../controllers/order.controller.js'

const orderRoutes = express.Router()

orderRoutes.post('/create', createOrder)
orderRoutes.get('/get/user/:userId', getUserOrders)
orderRoutes.get('/get/:orderId', getOrder)
orderRoutes.put('/update/:orderId/status', updateOrderStatus)

export default orderRoutes