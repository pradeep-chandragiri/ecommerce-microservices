import { api } from './apiService.js'

// create order
export const createOrder = async (data) => {
    const response = await api.post('/orders/create', data)
    return response.data
}

// get all orders of user
export const getUserOrders = async (userId) => {

    if (!userId) {
        throw new Error('User ID is required')
    }

    const response = await api.get(`/orders/get/user/${userId}`)

    return response.data
}

// get single order
export const getSingleOrder = async (orderId) => {
    const response = await api.get(`/orders/get/${orderId}`)
    return response.data
}