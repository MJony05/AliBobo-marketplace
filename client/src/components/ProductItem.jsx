import { Link } from 'react-router-dom'
import './product.css'
import RemoveIcon from '@mui/icons-material/Remove'
const ProductItem = ({ product }) => {
  const { code, name, price, image } = product
  const url = process.env.REACT_APP_API_URL
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
          <button className="amount-btn-left">
            <RemoveIcon />
          </button>
          <input type="number" inputMode="numeric" />
          <button className="amount-btn-right">+</button>
        </div>
        <button className="card-button">Add to cart</button>
      </div>
    </div>
  )
}

export default ProductItem
