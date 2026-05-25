import jwt from 'jsonwebtoken'

export const optionalMiddleware = async (req, res, next) => {
    
    // requesting accessToken from cookies
    const accessToken = req.cookies.accessToken

    // checking for token existence
    if (!accessToken) {
        return next()
    }

    try {

        // decoding token
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        
        // extracting info
        req.user = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role
        }

        // passing to the next function
        next()

    } catch (error) {
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Session Expired!'
            })
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid Token!'
            })
        }

        console.error('Gateway Middleware: ', error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }

}
