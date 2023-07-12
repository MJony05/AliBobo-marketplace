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
