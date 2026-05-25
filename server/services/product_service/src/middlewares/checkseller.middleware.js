const checkSellerMiddleware = (allowedRoles) => {
    return (req, res, next) => {

        const userRole = req.headers['x-user-role']

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            })
        }

        next()
    }
}

export default checkSellerMiddleware