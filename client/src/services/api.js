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
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/categories/${category._id}`,
      category
    )
    return response.data.data
  } catch (error) {
    console.error('Error updating category:', error)
    throw error
  }
}
