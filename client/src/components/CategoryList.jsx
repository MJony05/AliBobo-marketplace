import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CategoryItem from './CategoryItem'
import './category.css'
function CategoriesList() {
  const [categories, setCategories] = useState([])
  const url = process.env.REACT_APP_API_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + '/api/v1/categories')
        setCategories(response.data.data)
        console.log('Categories:', response.data.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchData()
  }, [url])

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
