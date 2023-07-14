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
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="categories/" element={<CategoriesPage />} />
          <Route
            path="categories/:categoryId/subcategories"
            element={<SubcategoriesPage />}
          />
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
        <Footer />
      </div>
    </Router>
  )
}

export default App
