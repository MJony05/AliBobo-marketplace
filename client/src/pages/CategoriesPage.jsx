import CategoriesList from '../components/CategoryList'
import './homepage.css'
const Categories = () => {
  return (
    <div className="categories-page">
      <div className="container">
        <h1>Barcha Kategoriyalar</h1>
        <CategoriesList />
      </div>
    </div>
  )
}

export default Categories
