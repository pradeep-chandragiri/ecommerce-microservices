const generateUserId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let random4digits = ''

    for (let i = 0; i < 4; i++) {
        random4digits += chars[Math.floor(Math.random() * chars.length)]
    }

    return `USR-${random4digits}`
}

export default generateUserId