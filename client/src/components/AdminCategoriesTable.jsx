import React, { useState, useEffect } from 'react'
import { getCategories } from '../services/api'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  TableContainer,
} from '@mui/material'
import EditCategoryForm from './EditCategoryForm'

const CategoriesTable = () => {
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const url = process.env.REACT_APP_API_URL
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
  const handleEditButtonClick = (categoryId) => {
    setSelectedCategoryId(categoryId)
    setUpdateFormOpen(true)
  }

  const handleCategoryRowClick = (categoryId) => {
    // Handle opening the SubcategoriesTable component or perform other actions
    console.log('Category row clicked:', categoryId)
  }

  // Sample data for the categories table
  // const categories = [
  //   { id: 1, name: 'Category 1', image: 'image1.jpg' },
  //   { id: 2, name: 'Category 2', image: 'image2.jpg' },
  //   { id: 3, name: 'Category 3', image: 'image3.jpg' },
  // ]

  return (
    <TableContainer component={Paper} sx={{ padding: '32px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category._id}
              onClick={() => handleCategoryRowClick(category._id)}
            >
              <TableCell>
                <img src={url + '/' + category.image} width="80px" alt="" />{' '}
              </TableCell>
              <TableCell>{category._id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Button
                  sx={{ m: 2 }}
                  variant="outlined"
                  onClick={() => handleEditButtonClick(category._id)}
                >
                  Edit
                </Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isUpdateFormOpen} onClose={() => setUpdateFormOpen(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <EditCategoryForm categoryId={selectedCategoryId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateFormOpen(false)}>Cancel</Button>
          <Button onClick={() => setUpdateFormOpen(false)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  )
}

export default CategoriesTable
