import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems')
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }
  }, [])

  const updateLocalStorage = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items))
  }

  const addToCart = (product, quantity) => {
    const updatedItems = [...cartItems, { product, quantity }]
    setCartItems(updatedItems)
    updateLocalStorage(updatedItems)
  }

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(
      (item) => item.product._id !== productId
    )
    setCartItems(updatedItems)
    updateLocalStorage(updatedItems)
  }

  const updateQuantity = (productId, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.product._id === productId
        ? { ...item, quantity: item.quantity + quantity }
        : item
    )
    setCartItems(updatedItems)
    updateLocalStorage(updatedItems)
  }

  const clearCart = () => {
    setCartItems([])
    updateLocalStorage([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
