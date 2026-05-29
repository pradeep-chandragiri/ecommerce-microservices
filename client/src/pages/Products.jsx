import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../services/productService.js'

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                if (data.success) {
                    setProducts(data.data.products)
                }
            } catch (err) {
                setError('Failed to load products.')
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className="productsPage">

            {/* Breadcrumb */}
            <div className="productsBreadCrums">
                <p>
                    comet
                    <span className="material-symbols-rounded">chevron_right</span>
                    Products
                </p>
            </div>

            {/* Title */}
            <div className="productsTitleWrapper">
                <h3>Products</h3>
                <p>Everything You Need, In One Place</p>
            </div>

            {/* States */}
            {loading && (
                <div className="productsState">
                    <span className="material-symbols-rounded spinning">progress_activity</span>
                    <p>Loading products...</p>
                </div>
            )}

            {error && (
                <div className="productsState error">
                    <span className="material-symbols-rounded">error</span>
                    <p>{error}</p>
                </div>
            )}

            {/* Grid */}
            {!loading && !error && (
                <div className="productsGrid">
                    {products.length === 0 ? (
                        <div className="productsState">
                            <span className="material-symbols-rounded">inventory_2</span>
                            <p>No products available.</p>
                        </div>
                    ) : (
                        products.map((product) => (
                            <div
                                key={product.productId}
                                className="productCard"
                                onClick={() => navigate(`/products/${product.productId}`)}
                            >
                                {/* Image placeholder */}
                                <div className="productImageWrapper">
                                    <span className="material-symbols-rounded productImageIcon">inventory_2</span>
                                </div>

                                {/* Info */}
                                <div className="productInfo">
                                    <div className="productCategory">{product.category}</div>
                                    <h4 className="productName">{product.name}</h4>
                                    <p className="productDesc">{product.description}</p>
                                    <div className="productFooter">
                                        <span className="productPrice">₹{product.price}</span>
                                        <span className="productQty">
                                            <span className="material-symbols-rounded">package_2</span>
                                            {product.quantity} left
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default Products