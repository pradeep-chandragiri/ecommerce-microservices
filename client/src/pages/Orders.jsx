import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserOrders } from '../services/orderService.js'
import { useAuth } from '../hooks/useAuth.js'

const statusColors = {
    pending: { bg: '#fefce8', color: '#ca8a04', border: '#fde68a' },
    processing: { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
    shipped:    { bg: '#f0fdf4', color: '#16a34a', border: '#86efac' },
    delivered:  { bg: '#f0fdf4', color: '#15803d', border: '#4ade80' },
    cancelled:  { bg: '#fff5f5', color: '#ef4444', border: '#fca5a5' },
}

const Orders = () => {

    const { user } = useAuth()
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        const fetchOrders = async () => {
            try {
                setLoading(true)

                const data = await getUserOrders(user.id)

                if (data.success) {
                    setOrders(data.data.orders)
                }
                console.log(data)
            } catch (err) {
                console.log(err)
                setError('Failed to load orders.')
            } finally {
                setLoading(false)
            }
        }
        

        fetchOrders()

    }, [user])

    return (
        <div className="ordersPage">

            {/* Breadcrumb */}
            <div className="ordersBreadCrums">
                <p>
                    comet
                    <span className="material-symbols-rounded">chevron_right</span>
                    Orders
                </p>
            </div>

            {/* Title */}
            <div className="ordersTitleWrapper">
                <h3>Orders</h3>
                <p>Made by You</p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="ordersState">
                    <span className="material-symbols-rounded spinning">progress_activity</span>
                    <p>Loading orders...</p>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="ordersState error">
                    <span className="material-symbols-rounded">error</span>
                    <p>{error}</p>
                </div>
            )}

            {/* Empty */}
            {!loading && !error && orders.length === 0 && (
                <div className="ordersEmpty">
                    <span className="material-symbols-rounded ordersEmptyIcon">package_2</span>
                    <h4>No orders yet</h4>
                    <p>Place your first order from the cart</p>
                    <button className="browseBtn" onClick={() => navigate('/products')}>
                        <span className="material-symbols-rounded">arrow_back</span>
                        Browse Products
                    </button>
                </div>
            )}

            {/* Orders list */}
            {!loading && !error && orders.length > 0 && (
                <div className="ordersWrapper">
                    {orders.map((order) => {
                        const status = statusColors[order.orderStatus] || statusColors.pending
                        return (
                            <div key={order.orderId} className="orderCard">

                                {/* Order Header */}
                                <div className="orderCardHeader">
                                    <div className="orderCardLeft">
                                        <span className="material-symbols-rounded orderIcon">package_2</span>
                                        <div>
                                            <p className="orderId">{order.orderId}</p>
                                            <p className="orderDate">
                                                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric', month: 'short', year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="orderCardRight">
                                        <span
                                            className="orderStatus"
                                            style={{
                                                background: status.bg,
                                                color: status.color,
                                                border: `1px solid ${status.border}`
                                            }}
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Meta */}
                                <div className="orderCardMeta">
                                    <div className="orderMetaRow">
                                        <span className="material-symbols-rounded">location_on</span>
                                        <p>{order.shippingAddress?.replace(/"/g, '')}</p>
                                    </div>
                                    <div className="orderMetaRow">
                                        <span className="material-symbols-rounded">payments</span>
                                        <p>Payment: <strong>{order.paymentStatus}</strong></p>
                                    </div>
                                    {/* Order Items */}
                                    <div className="orderItems">
                                        {order.items?.map((item) => (
                                            <div key={item.id} className="orderItemCard">
                                                <div className="orderItemIcon">
                                                    <span className="material-symbols-rounded">inventory_2</span>
                                                </div>
                                                <div className="orderItemInfo">
                                                    <p className="orderItemName">{item.name}</p>
                                                    <p className="orderItemDesc">{item.description}</p>
                                                </div>
                                                <div className="orderItemPrice">
                                                    <span>₹{item.price}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Footer */}
                                <div className="orderCardFooter">
                                    <span className="orderTotal">₹{order.totalAmount}</span>
                                </div>

                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Orders