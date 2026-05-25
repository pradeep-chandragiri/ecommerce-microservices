import axios from 'axios'
import cartModel from '../models/cart.model.js'
import generateITMID from '../utils/generateItemId.js'

export const addCartItem = async (req, res) => {
    
    const { productId } = req.body

    try {
        
        // fetching product information
        const response = await axios.get(`${process.env.PRODUCT_INTERNAL_SERVICE_URI}/${productId}`)

        const data = response.data

        // if product is not found error
        if (!data.success) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            })
        }

        // ITM-ID creation
        const itemId = generateITMID()

        // Extracting product information
        const product = data.data.product

        // getting user id from header
        const userId = req.headers['x-user-id']

        // preparing data for cart item
        const name = product.name
        const description = product.description
        const price = product.price

        // saving data into database
        const cartItem = await cartModel.create({
            itemId,
            userId,
            productId,
            name,
            description,
            price
        })

        return res.status(201).json({
            success: true,
            message: 'Item added to cart!',
            data: {
                cartItem
            }
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }

}


export const getCartItem = async (req, res) => {
    
    const userId = req.headers['x-user-id']

    try {
        
        const items = await cartModel.find({ userId })
        if (items.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'Cart is empty'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Items fetched to cart successfully',
            data: {
                items
            }
        })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }

}

export const deleteCartItem = async (req, res) => {
    
    const { itemId } = req.params

    if (!itemId) {
        return res.status(404).json({
            success: false,
            message: 'Item not found!'
        })
    }

    try {
        
        // checking for item existance
        const item = await cartModel.findOne({ itemId })
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found!'
            })
        }

        await cartModel.findOneAndDelete({ itemId })

        return res.status(200).json({
            success: true,
            message: 'Item deleted successfully!'
        })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }

}

export const clearCartItems = async (req, res) => {
    
    const userId = req.headers['x-user-id']

    try {
        
        await cartModel.deleteMany({ userId })

        return res.status(200).json({
            success: true,
            message: 'Cart is cleared!'
        })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }

}