import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import OrderPage from './pages/OrderPage'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
