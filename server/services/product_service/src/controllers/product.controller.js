import productModel from '../models/product.model.js'
import generateProductId from '../utils/generateProductId.js'

export const createProduct = async (req, res) => {
    
    const { name, description, price, quantity, category } = req.body

    if (!name || !description || !price || !quantity || !category) {
        return res.status(400).json({
            success: false,
            message: 'Required fields are missing!'
        })
    }

    // sanitized input fields
    const sanitizedName = name.trim()
    const sanitizedDescription = description.trim()
    const sanitizedPrice = Number(price)
    const sanitizedQuantity = Number(quantity)
    const sanitizedCategory = category.trim()

    // validating input fields
    if (sanitizedName.length > 100) {
        return res.status(400).json({
            success: false,
            message: 'Product name must not exceed 100 characters.'
        })
    }

    if (sanitizedDescription.length > 300) {
        return res.status(400).json({
            success: false,
            message: 'Product description must not exceed 300 characters'
        })
    }
    
    if (isNaN(sanitizedPrice) || sanitizedPrice <= 0 || sanitizedPrice > 10000) {
        return res.status(400).json({
            success: false,
            message: 'Product price must be a valid number and less than 10000'
        })
    }

    if (isNaN(sanitizedQuantity) || sanitizedQuantity < 0 || sanitizedQuantity > 100) {
        return res.status(400).json({
            success: false,
            message: 'Product quantity must be a valid number and less than or equal to 100'
        })
    }


    try {

        // getting user id from the headers
        const userId = req.headers['x-user-id']

        // creating product id
        const productId = generateProductId()

        // saving to database
        const product = await productModel.create({
            productId,
            userId,
            name: sanitizedName,
            description: sanitizedDescription,
            price: sanitizedPrice,
            quantity: sanitizedQuantity,
            category: sanitizedCategory
        })

        return res.status(201).json({
            success: true,
            message: 'Product created successfully!',
            data: {
                product
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

export const getAllProduct = async (req, res) => {
    
    try {

        const products = await productModel.find({})

        // checking for products existance
        if (products.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Products not found!'
            })
        }
        
        return res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: {
                products
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

export const getMyProduct = async (req, res) => {
    
    try {

        // getting user id from headers
        const userId = req.headers['x-user-id']

        // fetching from database
        const products = await productModel.find({ userId })
        if (products.length === 0) {
            return res.status(400).json({
                success: false,
                message: `You haven't created any products yet!`
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: {
                products
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

export const getProduct = async (req, res) => {
    
    const { productId } = req.params

    if (!productId) {
        return res.status(400).json({
            success: false,
            message: 'Requested URL is not valid!'
        })
    }

    try {

        // checking for a product in db based on the id
        const product = await productModel.findOne({ productId })
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            })
        }
        
        return res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: {
                product
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

export const updateProduct = async (req, res) => {
    
    const { productId } = req.params
    const { name, description, price, quantity, category } = req.body

    if (!productId) {
        return res.status(404).json({
            success: false,
            message: 'Product not found!'
        })
    }

    // sanitizing input fields
    const sanitizedName = name ? name.trim() : ''
    const sanitizedDescription = description ? description.trim() : ''
    const sanitizedPrice = price ? Number(price) : ''
    const sanitizedQuantity = quantity ? Number(quantity) : ''
    const sanitizedCategory = category ? category.trim() : ''

    // validating input fields
    if (sanitizedName.length > 100) {
        return res.status(400).json({
            success: false,
            message: 'Product name must not exceed 100 characters.'
        })
    }

    if (sanitizedDescription.length > 300) {
        return res.status(400).json({
            success: false,
            message: 'Product description must not exceed 300 characters'
        })
    }
    
    if (isNaN(sanitizedPrice) || sanitizedPrice <= 0 || sanitizedPrice > 10000) {
        return res.status(400).json({
            success: false,
            message: 'Product price must be a valid number and less than 10000'
        })
    }

    if (isNaN(sanitizedQuantity) || sanitizedQuantity < 0 || sanitizedQuantity > 100) {
        return res.status(400).json({
            success: false,
            message: 'Product quantity must be a valid number and less than or equal to 100'
        })
    }


    try {
        
        const product = await productModel.findOne({ productId })
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            })
        }

        product.name = sanitizedName || product.name
        product.description = sanitizedDescription || product.description
        product.price = sanitizedPrice || product.price
        product.quantity = sanitizedQuantity || product.quantity
        product.category = sanitizedCategory || product.category

        await product.save()

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: {
                product
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

export const deleteProduct = async (req, res) => {
    
    const { productId } = req.params

    if (!productId) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    try {
        
        // checking for a product in db with product id
        const prodcut = await productModel.findOne({ productId })
        if (!prodcut) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            })
        }

        await productModel.findOneAndDelete({ productId })

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully!'
        })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }

}