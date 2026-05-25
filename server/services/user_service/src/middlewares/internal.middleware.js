export const internalKeyCheck = async (req, res, next) => {
    
    // getting api key
    const apiKey = req.headers['x-internal-api-key']

    // checking whether both are correct or not
    if (!apiKey || apiKey !== process.env.USER_INTERNAL_API_KEY){
        return res.status(403).json({
            success: false,
            message: 'Forbidden.'
        })
    }

    // passing into next function
    next()
}