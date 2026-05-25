import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({

    itemId: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: String
    },
    productId: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    }

}, { timestamps: true })

const cartModel = mongoose.models.cartItems || mongoose.model('cartItems', cartSchema)

export default cartModel