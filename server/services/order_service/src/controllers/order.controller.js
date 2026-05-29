import axios from 'axios'
import generateOrderId from '../utils/generateId.js'
import prisma from '../configs/db.js'

export const createOrder = async (req, res) => {

    const { shippingAddress, contactInfo } = req.body
    
    try {

        // getting userid from the req.headers
        const userId = req.headers['x-user-id']

        // creating orderid
        const orderId = generateOrderId()

        // calling cart item
        const response = await axios.get(`${process.env.CART_SERVICE_URL}/get/${userId}`, {
            headers: {
                'x-user-id': userId
            }
        })

        // assing response.data to data
        const data = response.data
        // checking for the success
        if (!data.success) {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong while fetching cart items!'
            })
        }

        // expracting items from data
        const items = data.data.items
        console.log(items)
        // calculating the totalAmount
        const totalAmount = items.reduce((total, item) => total + item.price, 0)

        // creating an order and saving into db
        const order = await prisma.order.create({
            data: {
                orderId,
                userId,
                totalAmount,
                shippingAddress: JSON.stringify(shippingAddress),
                contactInfo: JSON.stringify(contactInfo)
            }
        })

        await prisma.orderItem.createMany({
            data: items.map(item => ({
                orderId,
                productId: item.productId,
                name: item.name,
                description: item.description,
                price: item.price
            }))
        })
        
        // calling catClear for clearing the products inside cart after order success
        const clearResponse = await axios.delete(`${process.env.CART_SERVICE_URL}/clear/${userId}`, {
            headers: {
                'x-user-id': userId
            }
        })

        // extracting info
        const clearData = clearResponse.data

        // checking for the success
        if (!clearData.success) {
            return res.status(400).json({
                success: false,
                message: 'Failde to clear the cart items!'
            })
        }

        return res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: {
                order
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


export const getUserOrders = async (req, res) => {
    
    try {

        // getting userid from req.headers
        const userId = req.headers['x-user-id']

        const orders = await prisma.order.findMany({ 
            where: { userId },
            include: { items: true }
        })

        if (orders.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No orders placed yet!'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: {
                orders
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

export const getOrder = async (req, res) => {
    
    const { orderId } = req.params

    try {

        const order = await prisma.order.findFirst({ 
            where: { orderId } 
        })

        if (!order) {
            return res.status(400).json({
                success: false,
                message: 'No order found!'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: {
                order
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


export const updateOrderStatus = async (req, res) => {
    
    const { orderStatus } = req.body
    const { orderId } = req.params

    if (!orderStatus) {
        return res.status(400).json({
            success: false,
            message: 'Missing order status to change'
        })
    }

    try {
        
        const order = await prisma.order.findFirst({ 
            where: { orderId } 
        })

        if (!order) {
            return res.status(400).json({
                success: false,
                message: 'No order found!'
            })
        }

        const updatedOrder = await prisma.order.update({
            where: { orderId },
            data: { orderStatus }
        })

        return res.status(200).json({
            success: true,
            message: 'Order status updated successfully!',
            data: {
                updatedOrder
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