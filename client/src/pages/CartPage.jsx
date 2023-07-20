import { useContext } from 'react'
import { CartContext } from '../CartContext'
import { Button } from '@mui/material'
import './cart.css'
const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext)

  const handleRemoveItem = (productId) => {
    removeFromCart(productId)
  }

  const handleDecreaseQuantity = (productId) => {
    updateQuantity(productId, -1)
  }

  const handleIncreaseQuantity = (productId) => {
    updateQuantity(productId, 1)
  }

  const handleClearCart = () => {
    clearCart()
  }

  const calculateSubtotal = (price, quantity) => {
    return price * quantity
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + calculateSubtotal(item.product.price, item.quantity),
      0
    )
  }

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product._id}>
                <td>{item.product.name}</td>
                <td>{item.product.price}</td>
                <td>
                  <Button
                    onClick={() => handleDecreaseQuantity(item.product._id)}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    onClick={() => handleIncreaseQuantity(item.product._id)}
                  >
                    +
                  </Button>
                </td>
                <td>{calculateSubtotal(item.product.price, item.quantity)}</td>
                <td>
                  <Button onClick={() => handleRemoveItem(item.product._id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} align="right">
                Total:
              </td>
              <td align="right">{calculateTotal()}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
      {cartItems.length > 0 && (
        <Button variant="contained" onClick={handleClearCart}>
          Clear Cart
        </Button>
      )}
    </div>
  )
}

export default CartPage
