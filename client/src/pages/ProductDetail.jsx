import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSingleProduct } from '../services/productService.js'
import { addToCart } from '../services/cartService.js'
import { useAuth } from '../hooks/useAuth.js'

const ProductDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [cartMsg, setCartMsg] = useState('')
    const [adding, setAdding] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getSingleProduct(id)
                if (data.success) {
                    setProduct(data.data.product)
                }
            } catch (err) {
                setError('Product not found.')
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }
        setAdding(true)
        setCartMsg('')
        try {
            await addToCart({ productId: id, quantity: 1 })
            setCartMsg('Added to cart!')
        } catch (err) {
            setCartMsg(err.response?.data?.message || 'Failed to add to cart.')
        } finally {
            setAdding(false)
        }
    }

    return (
        <div className="productDetailPage">

            {/* Breadcrumb */}
            <div className="detailBreadCrums">
                <p>
                    <span onClick={() => navigate('/products')} className="breadLink">Products</span>
                    <span className="material-symbols-rounded">chevron_right</span>
                    {product ? product.name : 'Loading...'}
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="detailState">
                    <span className="material-symbols-rounded spinning">progress_activity</span>
                    <p>Loading product...</p>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="detailState error">
                    <span className="material-symbols-rounded">error</span>
                    <p>{error}</p>
                </div>
            )}

            {/* Content */}
            {!loading && !error && product && (
                <div className="detailContainer">

                    {/* Image */}
                    <div className="detailImageWrapper">
                        <span className="material-symbols-rounded detailImageIcon">inventory_2</span>
                    </div>

                    {/* Info */}
                    <div className="detailInfoWrapper">

                        <div className="detailTitleWrapper">
                            <div className="detailCategory">{product.category}</div>
                            <h2 className="detailName">{product.name}</h2>
                            <p className="detailDesc">{product.description}</p>
                        </div>

                        <div className="detailMetaWrapper">
                            <div className="detailMetaRow">
                                <span className="material-symbols-rounded">package_2</span>
                                <p>{product.quantity} in stock</p>
                            </div>
                            <div className="detailMetaRow">
                                <span className="material-symbols-rounded">sell</span>
                                <p>Product ID: {product.productId}</p>
                            </div>
                        </div>

                        <div className="detailPriceWrapper">
                            <span className="detailPrice">₹{product.price}</span>
                        </div>

                        {/* Cart feedback */}
                        {cartMsg && (
                            <div className={`cartMsg ${cartMsg === 'Added to cart!' ? 'success' : 'error'}`}>
                                <span className="material-symbols-rounded">
                                    {cartMsg === 'Added to cart!' ? 'check_circle' : 'error'}
                                </span>
                                <p>{cartMsg}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="detailActions">
                            <button className="addToCartBtn" onClick={handleAddToCart} disabled={adding}>
                                <span className="material-symbols-rounded">shopping_cart</span>
                                {adding ? 'Adding...' : 'Add to Cart'}
                            </button>
                            <button className="backBtn" onClick={() => navigate('/products')}>
                                <span className="material-symbols-rounded">arrow_back</span>
                                Back
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default ProductDetail