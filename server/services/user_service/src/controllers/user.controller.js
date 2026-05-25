import userModel from '../models/user.model.js'

export const createUser = async (req, res) => {
    
    const { userId, name } = req.body

    try {
        
        // checking for existing user
        const existingUser = await userModel.findOne({ userId })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'An user is already exists with this credentials.'
            })
        }

        // saving into database
        const user = await userModel.create({
            userId,
            name
        })

        return res.status(201).json({
            success: true,
            message: 'User created successfully.',
            data: {
                user: {
                    id: user.userId,
                    name: user.name
                }
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


export const getUser = async (req, res) => {
    
    const userId = req.headers['x-user-id']

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'Requested URL is not valid!'
        })
    }

    try {
        
        const user = await userModel.findOne({ userId })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found!'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User fetched successfully.',
            data: {
                user: {
                    id: user.userId,
                    name: user.name,
                    phone: user.contact,
                    address: user.address
                }
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


export const updateUser = async (req, res) => {

    const userId = req.headers['x-user-id']
    const { contact, street, village, city, pincode, state, country } = req.body

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'Requested user to update is not found'
        })
    }

    if (!contact) {
        return res.status(400).json({
            success: false,
            message: 'Contact is required!'
        })
    }

    // sanitizing input fields
    const sanitizedContact = contact.trim()
    const sanitizedStreet = street ? street.trim() : ''
    const sanitizedVillage = village ? village.trim() : ''
    const sanitizedCity = city ? city.trim() : ''
    const sanitizedPincode = pincode ? pincode.trim() : ''
    const sanitizedState = state ? state.trim() : ''
    const sanitizedCountry = country ? country.trim() : ''

    // validating input fields
    if (isNaN(sanitizedContact) || sanitizedContact.length !== 10) {
        return res.status(400).json({
            success: false,
            message: 'Phone should be in numeric format and it should be exactly 10 digits!'
        })
    }

    if (pincode && (isNaN(sanitizedPincode) || sanitizedPincode.length !== 6)) {
        return res.status(400).json({
            success: false,
            message: 'Pincode should be in numeric format and it should be exactly 6 digits!'
        })
    }
    
    try {

        // checking for user existance
        const user = await userModel.findOne({ userId })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            })
        }

        user.contact = sanitizedContact
        user.address = {
            street: sanitizedStreet || user.address.street,
            village: sanitizedVillage || user.address.village,
            city: sanitizedCity || user.address.city,
            pincode: sanitizedPincode || user.address.pincode,
            state: sanitizedState || user.address.state,
            country: sanitizedCountry || user.address.country
        }

        await user.save()
        
        return res.status(200).json({
            success: true,
            message: 'User updated successfully.',
            data: {
                user: {
                    id: user.userId,
                    name: user.name,
                    contact: user.contact,
                    address: user.address
                }
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