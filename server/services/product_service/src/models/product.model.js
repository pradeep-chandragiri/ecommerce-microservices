import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({

    productId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }

}, { timestamps: true })

const productModel = mongoose.models.products || mongoose.model('products', productSchema)

export default productModel