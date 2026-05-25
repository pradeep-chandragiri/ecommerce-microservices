const generateProductId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let random4digits = ''

    for (let i = 0; i < 4; i++) {
        random4digits += chars[Math.floor(Math.random() * chars.length)]
    }

    return `PRO-${random4digits}`
}

export default generateProductId