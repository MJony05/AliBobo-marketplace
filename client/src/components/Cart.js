import React from 'react'
import { Link } from 'react-router-dom'

function Cart({ cartItems }) {
  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.product.id}>
          <h2>{item.product.name}</h2>
          <p>{item.quantity}</p>
        </div>
      ))}
      <Link to="/order">Order</Link>
    </div>
  )
}

export default Cart
