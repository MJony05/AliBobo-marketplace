import { useContext } from 'react'
import { CartContext } from '../CartContext'
import { Button, TextField } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import RemoveIcon from '@mui/icons-material/Remove'
import './cart.css'
const CartPage = () => {
  const url = process.env.REACT_APP_API_URL
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
    <div className="cart-page">
      <div className="container">
        <h2>Savat</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#eee' }}>
                  <TableCell width={'120px'}>Rasm</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell width={'250px'} align="right">
                    Subtotal
                  </TableCell>
                  <TableCell width={'60px'}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.product._id}>
                    <TableCell>
                      <img src={url + item.product.image} width="90px" alt="" />
                    </TableCell>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell align="right">
                      {item.product.price} so'm
                    </TableCell>
                    <TableCell>
                      <div className="input-quantity">
                        <div className="input-quantity-dec">
                          <RemoveIcon
                            fontSize="small"
                            onClick={() => {
                              if (item.quantity > 1)
                                handleDecreaseQuantity(item.product._id)
                            }}
                          />
                        </div>
                        <TextField
                          className="input-quantity-input"
                          size="small"
                          value={item.quantity}
                          inputProps={{
                            style: { textAlign: 'center' },
                            min: 1,
                            max: 100,
                          }}
                          onChange={(e) => {
                            if (typeof parseInt(e.target.value) === 'number') {
                              updateQuantity(
                                item.product._id,
                                e.target.value - item.quantity
                              )
                            }
                          }}
                        />
                        <div className="input-quantity-inc">
                          <AddIcon
                            fontSize="small"
                            onClick={() =>
                              handleIncreaseQuantity(item.product._id)
                            }
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell align="right">
                      {calculateSubtotal(item.product.price, item.quantity)}{' '}
                      so'm
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleRemoveItem(item.product._id)}
                      >
                        <CloseIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    Total:
                  </TableCell>
                  <TableCell align="right">{calculateTotal()}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {cartItems.length > 0 && (
          <Button variant="contained" onClick={handleClearCart}>
            Clear Cart
          </Button>
        )}
      </div>
    </div>
  )
}

export default CartPage
