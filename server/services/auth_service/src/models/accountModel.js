import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['buyer', 'seller'],
        default: 'seller'
    }

}, { timestamps: true })

const accountModel = mongoose.models.accounts || mongoose.model('accounts', accountSchema)

export default accountModel