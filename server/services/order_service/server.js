import app from './src/app.js'

const port = process.env.PORT || 5005
app.listen(port, () => {
    console.log(`Server is running on PORT: http://localhost:${port}`)
})