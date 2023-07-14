// fetching data from the http://localhost:4000/api/v1/categories endpoint
// fuction when call it it should return categories list

// import axios from 'axios'

// const api = axios.create({
//   baseURL: 'http://localhost:4000/api/v1',
// })

// export const getAllCategories = async () => {
//   const response = await api.get('/categories')
//   return response.data
// }

import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/categories`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export const createCategory = async (category) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/categories`, category)

    return response.data.data
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
}

export const updateCategory = async (category) => {
  console.log('category', category)
  if (!category.get('_id')) throw new Error('Category id is required')
  if (!category.get('name')) throw new Error('Category name is required')
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/categories/${category.get('_id')}`,
      category
    )
    return response.data.data
  } catch (error) {
    console.error('Error updating category:', error)
    throw error
  }
}

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/categories/${categoryId}`
    )
    return response.data.data
  } catch (error) {
    console.error('Error deleting category:', error)
    throw error
  }
}
// url = http://localhost:4000/api/v1/categories:id/subcategories
export const getSubcategories = async (componentId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/categories/${componentId}/subcategories`
    )
    return response.data.data
  } catch (error) {
    console.error('Error fetching subcategories:', error)
    throw error
  }
}

export const createSubcategory = async (componentId, subcategory) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/categories/${componentId}/subcategories`,
      subcategory
    )
    return response.data.data
  } catch (error) {
    console.error('Error creating subcategory:', error)
    throw error
  }
}

export const updateSubcategory = async (id, subcategory) => {
  if (!id) throw new Error('Subcategory id is required')
  if (!subcategory.get('name')) throw new Error('Subcategory name is required')
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/categories/subcategories/${id}`,
      subcategory
    )
    return response.data.data
  } catch (error) {
    console.error('Error updating subcategory:', error)
    throw error
  }
}

export const deleteSubcategory = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/categories/subcategories/${id}`
    )
    return response.data.data
  } catch (error) {
    console.error('Error deleting subcategory:', error)
    throw error
  }
}
