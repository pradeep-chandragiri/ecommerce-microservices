import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    address: {
        street: {
            type: String
        },
        village: {
            type: String
        },
        city: {
            type: String
        },
        pincode: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        }
    }

}, { timestamps: true })

const userModel = mongoose.models.users || mongoose.model('users', userSchema)

export default userModel
