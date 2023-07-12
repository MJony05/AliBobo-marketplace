import React, { useEffect, useState } from 'react'
import CategoryItem from './CategoryItem'
import { getCategories } from '../services/api'
import './category.css'
function CategoriesList() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchData()
  }, [])
  const categoriesList =
    categories.length !== 0 ? (
      categories.map((category) => {
        return <CategoryItem key={category._id} item={category} />
      })
    ) : (
      <p>No categories found</p>
    )

  // Render the categories
  return (
    <div className="categories">
      <ul className="category-list">{categoriesList}</ul>
    </div>
  )
}

export default CategoriesList
