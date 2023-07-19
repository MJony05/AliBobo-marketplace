import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { CartContext } from '../CartContext'
import './product.css'
import RemoveIcon from '@mui/icons-material/Remove'

const ProductItem = ({ product }) => {
  const { code, name, price, image } = product
  const url = process.env.REACT_APP_API_URL
  const { addToCart, cartItems } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const navigate = useNavigate()

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
    setAddedToCart(true)
  }

  const isProductAdded = cartItems.some(
    (item) => item.product._id === product._id
  )

  const handleNavigateToCart = () => {
    navigate('/cart')
  }

  return (
    <div className="product-item">
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to={`/products/${product._id}`}
        className="product-item-content"
      >
        <div className="product-item__image">
          <img src={`${url}/${image}`} alt={name} />
        </div>
        <p className="product-card-code">#{code}</p>
        <p className="product-card-name">
          {name.length > 85 ? name.slice(0, 85) + '...' : name}
        </p>
        <p className="product-card-price">
          <span> {price.toLocaleString()}</span> so'm
        </p>
      </Link>
      <div className="product-item-action">
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
          onClick={isProductAdded ? handleNavigateToCart : handleAddToCart}
        >
          {isProductAdded ? 'Go to Cart' : 'Add to Cart'}
        </button>
        {addedToCart && (
          <p className="added-text">
            Added to Cart! Click "Go to Cart" to view your cart.
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductItem
