import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/authService.js'

const Register = () => {

    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.password) {
            setError('Please fill in all fields.')
            return
        }

        setLoading(true)
        
        try {
            await register(form)
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="loginPage">
                <div className="loginContainer">
                    <div className="mainWrapper">
                        <div className="loginTitleWrapper">
                            <h3>Sign In</h3>
                            <p>Get access to your Orders, Cart and Profile</p>
                        </div>
                        <div className="loginMainWrapper">
                            <div className="inputWrapper">
                                <div className="singleInp">
                                    <div className="inpIcon">
                                        <span className="material-symbols-rounded">account_circle</span>
                                    </div>
                                    <div className="inpTxt">
                                        <div className="inpLabel">
                                            <label>Full name</label>
                                        </div>
                                        <div className="inpInput">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter full name"
                                                value={form.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="singleInp">
                                    <div className="inpIcon">
                                        <span className="material-symbols-rounded">account_circle</span>
                                    </div>
                                    <div className="inpTxt">
                                        <div className="inpLabel">
                                            <label>Email address</label>
                                        </div>
                                        <div className="inpInput">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={form.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="singleInp">
                                    <div className="inpIcon">
                                        <span className="material-symbols-rounded">vpn_key</span>
                                    </div>
                                    <div className="inpTxt">
                                        <div className="inpLabel">
                                            <label>Password</label>
                                        </div>
                                        <div className="inpInput">
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Enter password"
                                                value={form.password}
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

                        {/* Submit */}
                        <div className="signupSwitchWrapper">
                            <button
                                className="submitBtn"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create account'}
                            </button>
                            <p className="switchText">
                                Already a Comet member?{' '}
                                <Link to="/login" className="switchLink">Login here</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Register