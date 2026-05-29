import { api } from './apiService.js'

// get user
export const getUser = async () => {
    const response = await api.get(
        '/users/get'
    )

    // returning resoponse data
    return response.data
}

// update user
export const updateUser = async (formData) => {
    const response = await api.put(
        '/users/update',
        formData
    )

    // returning resoponse data
    return response.data
}
