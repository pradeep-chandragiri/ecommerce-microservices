import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getMyProduct, getProduct, updateProduct } from '../controllers/product.controller.js'
import checkSellerMiddleware from '../middlewares/checkseller.middleware.js'

const productRoutes = express.Router()

productRoutes.get('/all', getAllProduct)
productRoutes.get('/get/:productId', getProduct)
// protected routes
productRoutes.post('/create', checkSellerMiddleware(['seller']), createProduct)
productRoutes.get('/my-products', checkSellerMiddleware(['seller']), getMyProduct)
productRoutes.put('/update/:productId', checkSellerMiddleware(['seller']), updateProduct)
productRoutes.delete('/delete/:productId', checkSellerMiddleware(['seller']), deleteProduct)

export default productRoutes