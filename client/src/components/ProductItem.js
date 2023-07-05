import React from 'react'
import { Link } from 'react-router-dom'

function ProductItem({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <p>{product.category}</p>
      <p>{product.size}</p>
      <Link to={`/product/${product.id}`}>View</Link>
    </div>
  )
}

export default ProductItem
