import { useEffect, useState } from 'react'
import { getProduct } from '../services/api'
import { useParams } from 'react-router-dom'
import RemoveIcon from '@mui/icons-material/Remove'
const OneProductPage = () => {
  const { productId } = useParams()
  const url = process.env.REACT_APP_API_URL
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(productId)
      setProduct(product)
      setLoading(false)
    }
    fetchProduct()
  }, [productId])
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="one-product-page">
      <div className="container">
        <div className="product-image">
          <img src={url + product?.image} alt={product?.name} />
        </div>
        <div className="product-details">
          <div className="product-info">
            <p className="product-name">{product?.name}</p>

            <div className="product-code">#{product?.code}</div>
            <div className="product-price">
              <span>{product?.price.toLocaleString()}</span>
              so'm
            </div>
            <div className="product-action">
              <div className="amount">
                <button className="amount-btn-left">
                  <RemoveIcon />
                </button>
                <input type="number" inputMode="numeric" />
                <button className="amount-btn-right">+</button>
              </div>
              <button className="card-button">Add to cart</button>
            </div>
            <div className="product-category">
              <span>Kategoriya: </span>
              {product?.category.name}
            </div>
            {product.subcategory ? (
              <div className="product-subcategory">
                <span>Subkategoriyasi: </span>
                {product?.subcategory?.name}
              </div>
            ) : null}
            <div className="product-description">
              <span>Tavsifi: </span>
              {product?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OneProductPage

// Path: client\src\pages\ProductsPage.jsx
// Compare this snippet from client\src\pages\ProductsPage.jsx:
// import { useEffect, useState } from 'react'
// import { getProducts } from '../services/api'
// import ProductList from '../components/ProductList'
// const ProductsPage = () => {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   useEffect(() => {
