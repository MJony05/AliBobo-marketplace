import { useParams } from 'react-router-dom'
import { getSubcategories, getCategory } from '../services/api'
import { useEffect, useState } from 'react'
import SubCategoryList from '../components/SubcategoryList'
const SubCategoriesPage = () => {
  const { categoryId } = useParams()
  const [subcategories, setSubcategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(null)
  useEffect(() => {
    const fetchCategory = async () => {
      const category = await getCategory(categoryId)
      setCategory(category)
    }
    fetchCategory()
  }, [categoryId])

  useEffect(() => {
    const fetchSubcategories = async () => {
      const subcategories = await getSubcategories(categoryId)
      setSubcategories(subcategories)
      setLoading(false)
    }
    fetchSubcategories()
  }, [categoryId])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="admin-page">
      <h1>{category?.name} kategoriyasi</h1>
      <SubCategoryList subcategories={subcategories} />
    </div>
  )
}

export default SubCategoriesPage
