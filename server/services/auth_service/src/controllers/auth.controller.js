import axios from 'axios'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import accountModel from '../models/accountModel.js'
import generateUserId from '../utils/generateUserId.js'


export const register = async (req, res) => {
    
    const { name, email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Required fields are missing!'
        })
    }

    // sanitizing input fields
    const sanitizedName = name.trim()
    const sanitizedEmail = email.trim().toLowerCase()
    const sanitizedPassword = password.trim()

    
    // Name regex checking
    const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/
    if (!nameRegex.test(sanitizedName)){
        return res.status(400).json({
            success: false,
            message: 'Name should contain only alphabets and single spaces between words.'
        })
    }
    if (sanitizedName.length < 3) {
        return res.status(400).json({
            success: false,
            message: 'Name must be at least 3 character long.'
        })
    }
    
    // Email regex checking
    const emailRegex = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if (!emailRegex.test(sanitizedEmail)){
        return res.status(400).json({
            success: false,
            message: 'Please enter a valid email address.'
        })
    }

    // Password regex checking   
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\])[A-Za-z\d@$!%*?&_#^()[\]{}\-+=~`|:;"'<>,./\\]{8,64}$/
    if (!passwordRegex.test(sanitizedPassword)){
        return res.status(400).json({
            success: false,
            message: 'Password must be 8 characters long and include uppercase, lowercase, number, and special character.'
        })
    }

    try {

        // checking for a user existance
        const existingUser = await accountModel.findOne({ email: sanitizedEmail })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email address is already exists!'
            })
        }

        // user id creation
        const userId = generateUserId()

        // password hashing
        const hashedPassword = await bcrypt.hash(sanitizedPassword, 10)

        // saving user into database
        const user = await accountModel.create({
            userId,
            email: sanitizedEmail,
            password: hashedPassword
        })

        // internall calling user api to create a user
        // POST http://localhost:5002/create
        try {
            
            const payload = {
                userId,
                name: sanitizedName
            }
            await axios.post(`${process.env.USER_INTERNAL_RESOURCE_URL}`, payload,
                {
                    headers: {
                        'x-internal-api-key': process.env.USER_INTERNAL_API_KEY
                    }
                }
            )

        } catch (error) {
            console.error('User Created Failed: ', error)
            try {
                await accountModel.findOneAndDelete({ email: sanitizedEmail })
            } catch (rollbackError) {
                console.error('Rollback Failed: ', rollbackError.message)
            }
        }

        return res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            data: {
                user: {
                    userId: user.userId,
                    email: user.email,
                    role: user.role
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


export const login = async (req, res) => {
    
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Required fields are missing!'
        })
    }

    // sanitizing input fields
    const sanitizedEmail = email.trim().toLowerCase()
    const sanitizedPassword = password.trim()

        // Email regex checking
    const emailRegex = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if (!emailRegex.test(sanitizedEmail)){
        return res.status(400).json({
            success: false,
            message: 'Please enter a valid email address.'
        })
    }

    try {

        // checking for a user
        const user = await accountModel.findOne({ email: sanitizedEmail })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials!'
            })
        }

        // compare password 
        const isMatch = await bcrypt.compare(sanitizedPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials!'
            })
        }

        const accessToken = jwt.sign(
            { userId: user.userId, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
        )

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 5 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully!',
            data: {
                user: {
                    userId: user.userId,
                    email: user.email,
                    role: user.role
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


export const logout = async (req, res) => {
    
    try {

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully!'
        })
        
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }

}