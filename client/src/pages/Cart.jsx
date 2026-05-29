import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCartItems, removeCartItem, clearCart } from '../services/cartService.js'
import { useAuth } from '../hooks/useAuth.js'

const Cart = () => {
    
    const { user } = useAuth()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [removing, setRemoving] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchCart()
    }, [])

    const fetchCart = async () => {
        try {
            
            // then in fetchCart:
            const data = await getCartItems(user.userId)

            if (data.success) {
                setItems(data.data.items)
            }
        } catch (err) {
            setError('Failed to load cart.')
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = async (itemId) => {
        setRemoving(itemId)
        try {
            await removeCartItem(itemId)
            setItems(items.filter(item => item.itemId !== itemId))
        } catch (err) {
            setError('Failed to remove item.')
        } finally {
            setRemoving(null)
        }
    }

    const handleClear = async () => {
        try {
            // and in handleClear:
            await clearCart(user.userId)
            setItems([])
        } catch (err) {
            setError('Failed to clear cart.')
        }
    }

    const total = items.reduce((sum, item) => sum + (item.price * 1), 0)

    return (
        <div className="cartPage">

            {/* Breadcrumb */}
            <div className="cartBreadCrums">
                <p>
                    comet
                    <span className="material-symbols-rounded">chevron_right</span>
                    Cart
                </p>
            </div>

            {/* Title */}
            <div className="cartTitleWrapper">
                <h3>Cart</h3>
                <p>Items ({items.length})</p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="cartState">
                    <span className="material-symbols-rounded spinning">progress_activity</span>
                    <p>Loading cart...</p>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="cartState error">
                    <span className="material-symbols-rounded">error</span>
                    <p>{error}</p>
                </div>
            )}

            {/* Empty */}
            {!loading && !error && items.length === 0 && (
                <div className="cartEmpty">
                    <span className="material-symbols-rounded cartEmptyIcon">shopping_cart</span>
                    <h4>Your cart is empty</h4>
                    <p>Browse products and add items to your cart</p>
                    <button className="browseBtn" onClick={() => navigate('/products')}>
                        <span className="material-symbols-rounded">arrow_back</span>
                        Browse Products
                    </button>
                </div>
            )}

            {/* Items + Summary */}
            {!loading && !error && items.length > 0 && (
                <div className="cartLayout">

                    {/* Items list */}
                    <div className="cartItemsWrapper">
                        <div className="cartItemsHeader">
                            <p>Items in your cart</p>
                            <button className="clearBtn" onClick={handleClear}>
                                <span className="material-symbols-rounded">delete_sweep</span>
                                Clear all
                            </button>
                        </div>

                        <div className="cartItemsList">
                            {items.map((item) => (
                                <div key={item.itemId} className="cartItem">
                                    {/* Icon */}
                                    <div className="cartItemImage">
                                        <span className="material-symbols-rounded">inventory_2</span>
                                    </div>

                                    {/* Details */}
                                    <div className="cartItemDetails">
                                        <h4 className="cartItemName">{item.name}</h4>
                                        <p className="cartItemMeta">
                                            Qty: {item.quantity} &nbsp;·&nbsp; ₹{item.price} each
                                        </p>
                                    </div>

                                    {/* Price + Remove */}
                                    <div className="cartItemRight">
                                        <span className="cartItemTotal">₹{item.price * 1}</span>
                                        <button
                                            className="removeBtn"
                                            onClick={() => handleRemove(item.itemId)}
                                            disabled={removing === item.itemId}
                                        >
                                            <span className="material-symbols-rounded">
                                                {removing === item.itemId ? 'progress_activity' : 'close'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="cartSummary">
                        <div className="summaryTitleWrapper">
                            <h4>Order Summary</h4>
                        </div>

                        <div className="summaryRows">
                            <div className="summaryRow">
                                <p>Items ({items.length})</p>
                                <p>₹{total}</p>
                            </div>
                            <div className="summaryRow">
                                <p>Delivery</p>
                                <p className="freeTag">FREE</p>
                            </div>
                        </div>

                        <div className="summaryTotal">
                            <p>Total</p>
                            <p>₹{total}</p>
                        </div>

                        <button
                            className="placeOrderBtn"
                            onClick={() => navigate('/orders/new')}
                        >
                            <span className="material-symbols-rounded">local_shipping</span>
                            Place Order
                        </button>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Cart