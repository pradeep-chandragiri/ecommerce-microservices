import { api } from './apiService.js'

// getProducts
export const getProducts = async () => {
    const response = await api.get(
        '/products/all'
    )

    // returning resoponse data
    return response.data
}

// get single product
export const getSingleProduct = async (productId) => {
    const response = await api.get(
        `/products/get/${productId}`
    )

    // returning resoponse data
    return response.data
}

