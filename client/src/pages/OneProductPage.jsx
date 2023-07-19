import { useEffect, useState, useContext } from 'react'
import { getProduct } from '../services/api'
import { useParams, useNavigate } from 'react-router-dom'
import RemoveIcon from '@mui/icons-material/Remove'
import { CartContext } from '../CartContext'

const OneProductPage = () => {
  const { productId } = useParams()
  const url = process.env.REACT_APP_API_URL
  const { addToCart, cartItems } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProduct(productId)
        setProduct(product)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value)
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1)
  }

  const handleGoToCart = () => {
    navigate('/cart') // Navigate to the cart page
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!product) {
    return <div>Error: Product not found.</div>
  }

  const isProductAdded = cartItems.some(
    (item) => item.product._id === product._id
  )

  return (
    <div className="one-product-page">
      <div className="container">
        <div className="product-image">
          <img src={url + product.image} alt={product.name} />
        </div>
        <div className="product-details">
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <div className="product-code">#{product.code}</div>
            <div className="product-price">
              <span>{product.price.toLocaleString()}</span> so'm
            </div>
            <div className="product-action">
              <div className="amount">
                <button
                  className="amount-btn-left"
                  onClick={handleDecrease}
                  disabled={isProductAdded}
                >
                  <RemoveIcon />
                </button>
                <input
                  type="number"
                  inputMode="numeric"
                  value={quantity}
                  onChange={handleQuantityChange}
                  disabled={isProductAdded}
                />
                <button
                  className="amount-btn-right"
                  onClick={handleIncrease}
                  disabled={isProductAdded}
                >
                  +
                </button>
              </div>
              <button
                className="card-button"
                onClick={isProductAdded ? handleGoToCart : handleAddToCart}
              >
                {isProductAdded ? 'Go to Cart' : 'Add to Cart'}
              </button>
            </div>
            <div className="product-category">
              <span>Kategoriya: </span>
              {product.category.name}
            </div>
            {product.subcategory && (
              <div className="product-subcategory">
                <span>Subkategoriyasi: </span>
                {product.subcategory.name}
              </div>
            )}
            <div className="product-description">
              <span>Tavsifi: </span>
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OneProductPage
