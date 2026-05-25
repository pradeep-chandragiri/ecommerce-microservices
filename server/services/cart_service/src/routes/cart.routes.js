import express from 'express'
import { addCartItem, clearCartItems, deleteCartItem, getCartItem } from '../controllers/cart.controller.js'

const cartRoutes = express.Router()

cartRoutes.post('/add', addCartItem)
cartRoutes.get('/get/:userId', getCartItem)
cartRoutes.delete('/remove/:itemId', deleteCartItem)
cartRoutes.delete('/clear/:userId', clearCartItems)

export default cartRoutes