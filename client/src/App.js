import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CategoriesPage from './pages/CategoriesPage'
import SubcategoriesPage from './pages/SubCategoriesPage'
import AdminPage from './pages/AdminPage'
import AdminSubcategoriesTable from './components/AdminSubcategoriesTable'
import AdminProductsTable from './components/AdminProductsTable'
import CartPage from './pages/CartPage'
import ProductsPage from './pages/ProductsPage'
import OneProductPage from './pages/OneProductPage'
import { CartProvider } from './CartContext'
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="categories/" element={<CategoriesPage />} />
            <Route
              path="categories/:categoryId/"
              element={<SubcategoriesPage />}
            />
            <Route
              path="categories/:categoryId/:subcategoryId/"
              element={<ProductsPage />}
            />
            <Route path="products/:productId" element={<OneProductPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/admin/categories/:categoryId/subcategories"
              element={<AdminSubcategoriesTable />}
            />
            <Route
              path="/admin/categories/:categoryId/products"
              element={<AdminProductsTable />}
            />
          </Routes>
        </CartProvider>
        <Footer />
      </div>
    </Router>
  )
}

export default App
