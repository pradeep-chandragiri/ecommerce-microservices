import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../services/orderService.js'
import { useAuth } from '../hooks/useAuth.js'

const CreateOrder = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        shippingAddress: '',
        contactInfo: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async () => {
        if (!form.shippingAddress || !form.contactInfo) {
            setError('Please fill in all fields.')
            return
        }
        setLoading(true)
        try {
            await createOrder(form)
            navigate('/orders')
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="createOrderPage">

            {/* Breadcrumb */}
            <div className="orderBreadCrums">
                <p>
                    comet
                    <span className="material-symbols-rounded">chevron_right</span>
                    <span onClick={() => navigate('/orders')} className="breadLink">Orders</span>
                    <span className="material-symbols-rounded">chevron_right</span>
                    New Order
                </p>
            </div>

            {/* Title */}
            <div className="orderTitleWrapper">
                <h3>Place Order</h3>
                <p>Enter your delivery details</p>
            </div>

            <div className="createOrderContainer">

                <div className="mainWrapper">

                    <div className="loginTitleWrapper">
                        <h3>Delivery Details</h3>
                        <p>Your cart items will be ordered to this address</p>
                    </div>

                    <div className="loginMainWrapper">
                        <div className="inputWrapper">

                            {/* Shipping Address */}
                            <div className="singleInp">
                                <div className="inpIcon">
                                    <span className="material-symbols-rounded">location_on</span>
                                </div>
                                <div className="inpTxt">
                                    <div className="inpLabel">
                                        <label>Shipping Address</label>
                                    </div>
                                    <div className="inpInput">
                                        <input
                                            type="text"
                                            name="shippingAddress"
                                            placeholder="Enter full delivery address"
                                            value={form.shippingAddress}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="singleInp">
                                <div className="inpIcon">
                                    <span className="material-symbols-rounded">call</span>
                                </div>
                                <div className="inpTxt">
                                    <div className="inpLabel">
                                        <label>Contact Number</label>
                                    </div>
                                    <div className="inpInput">
                                        <input
                                            type="text"
                                            name="contactInfo"
                                            placeholder="Enter contact number"
                                            value={form.contactInfo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Error */}
                        {error && (
                            <div className="errorWrapper">
                                <span className="material-symbols-rounded">error</span>
                                <p>{error}</p>
                            </div>
                        )}
                    </div>

                    <div className="signupSwitchWrapper">
                        <button
                            className="submitBtn"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Placing order...' : 'Place Order'}
                        </button>
                        <p className="switchText">
                            <span onClick={() => navigate('/cart')} className="switchLink">
                                ← Back to Cart
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateOrder