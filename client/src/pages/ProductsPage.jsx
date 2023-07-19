import { useParams } from 'react-router-dom'
import ProductList from '../components/ProductList'
const ProductsPage = () => {
  const { categoryId } = useParams()
  const { subcategoryId } = useParams()

  return (
    <div className="product-page">
      <div className="container">
        <h1>Barcha Mahsulotlar</h1>
        <ProductList categoryId={categoryId} subcategoryId={subcategoryId} />
      </div>
    </div>
  )
}

export default ProductsPage
