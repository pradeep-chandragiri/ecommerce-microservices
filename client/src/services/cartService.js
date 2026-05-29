import { api } from './apiService.js'

export const addToCart = async (data) => {
    const response = await api.post('/cart/add', data)
    return response.data
}

// userId required in URL
export const getCartItems = async (userId) => {
    const response = await api.get(`/cart/get/${userId}`)
    return response.data
}

export const removeCartItem = async (itemId) => {
    const response = await api.delete(`/cart/remove/${itemId}`)
    return response.data
}

// userId required in URL
export const clearCart = async (userId) => {
    const response = await api.delete(`/cart/clear/${userId}`)
    return response.data
}