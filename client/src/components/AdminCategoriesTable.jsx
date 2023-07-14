import React, { useState, useEffect } from 'react'
import { getCategories, createCategory, updateCategory } from '../services/api'
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
  Typography,
  Toolbar,
  Grid,
} from '@mui/material'
import EditCategoryForm from './EditCategoryForm'
import AddCategoryForm from './AddCategoryForm'

const CategoriesTable = () => {
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false)
  const [isAddFormOpen, setAddFormOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [categories, setCategories] = useState([])

  const [categoryName, setCategoryName] = useState('')
  const [categoryImage, setCategoryImage] = useState(null)
  const handleCategoryNameChange = (name) => {
    setCategoryName(name)
  }
  const handleCategoryImageChange = (image) => {
    setCategoryImage(image)
  }
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
  // const handleEditButtonClick = (categoryId) => {
  //   setSelectedCategoryId(categoryId)
  //   setUpdateFormOpen(true)
  // }
  const handleAddButtonClick = () => {
    setAddFormOpen(true)
  }
  const handleCategoryRowClick = (categoryId) => {
    // Handle opening the SubcategoriesTable component or perform other actions
    console.log('Category row clicked:', categoryId)
  }

  const handleAddCategory = async () => {
    try {
      const formData = new FormData()
      formData.append('name', categoryName)
      formData.append('image', categoryImage)
      await createCategory(formData)
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }
  const handleUpdateCategory = async () => {
    try {
      const formData = new FormData()
      formData.append('name', categoryName)
      formData.append('image', categoryImage)
      await updateCategory(formData)
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }
  // Sample data for the categories table
  // const categories = [
  //   { id: 1, name: 'Category 1', image: 'image1.jpg' },
  //   { id: 2, name: 'Category 2', image: 'image2.jpg' },
  //   { id: 3, name: 'Category 3', image: 'image3.jpg' },
  // ]

  return (
    <TableContainer component={Paper} sx={{ padding: '0 32px' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Table Name</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddButtonClick()}
          >
            Add Category
          </Button>
        </Grid>
      </Toolbar>
      <Table aria-label="simple table" stickyHeader>
        <Dialog open={isAddFormOpen} onClose={() => setAddFormOpen(false)}>
          <DialogTitle>Kategoriya qoshish</DialogTitle>
          <DialogContent>
            <AddCategoryForm
              handleCategoryImageChange={handleCategoryImageChange}
              handleCategoryNameChange={handleCategoryNameChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddFormOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                handleAddCategory()
                setAddFormOpen(false)
              }}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
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
                  onClick={() => {
                    setUpdateFormOpen(true)
                  }}
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
        <DialogTitle>Kategoriyani o'zgartirish</DialogTitle>
        <DialogContent>
          <EditCategoryForm
            handleCategoryImageChange={handleCategoryImageChange}
            handleCategoryNameChange={handleCategoryNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setUpdateFormOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleUpdateCategory()
              setUpdateFormOpen(false)
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  )
}

export default CategoriesTable
