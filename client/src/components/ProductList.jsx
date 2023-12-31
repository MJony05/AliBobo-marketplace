import { getProducts } from '../services/api'
import { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import './product.css'
const ProductList = ({ categoryId, subcategoryId }) => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts(categoryId)
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchData()
  }, [categoryId])
  if (subcategoryId) {
    const newProducts = products.filter((product) => {
      return product.subcategory?._id === subcategoryId
    })

    return (
      <div className="product-list-component">
        <div className="product-list">
          {newProducts && newProducts.length > 0 ? (
            newProducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    )
  }
  return (
    <div className="product-list-component">
      <h2>Products</h2>
      <div className="product-list">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  )
}

export default ProductList
