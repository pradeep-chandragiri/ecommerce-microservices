import { api } from './apiService.js'

// register
export const register = async (formData) => {
    const response = await api.post(
        '/auth/register',
        formData
    )

    // returning resoponse data
    return response.data
}


// login
export const login = async (formData) => {
    const response = await api.post(
        '/auth/login',
        formData
    )

    // returning resoponse data
    return response.data
}


// logout
export const logout = async () => {
    const response = await api.post(
        '/auth/logout'
    )

    // returning resoponse data
    return response.data
}