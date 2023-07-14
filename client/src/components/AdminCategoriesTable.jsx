import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/api'
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
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
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
  const handleAddButtonClick = () => {
    setAddFormOpen(true)
  }

  const handleAddCategory = async () => {
    try {
      const formData = new FormData()
      formData.append('name', categoryName)
      formData.append('image', categoryImage)
      await createCategory(formData)
      const categoriesData = await getCategories()
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }
  const handleUpdateCategory = async () => {
    try {
      const formData = new FormData()
      formData.append('name', categoryName)
      formData.append('image', categoryImage)
      formData.append('_id', selectedCategoryId)
      await updateCategory(formData)
      const categoriesData = await getCategories()
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const handleDeleteButtonClick = async (selectedCategoryId) => {
    try {
      console.log(selectedCategoryId)
      await deleteCategory(selectedCategoryId)
      const categoriesData = await getCategories()
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error deleting category:', error)
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
          <Typography variant="h6">Kategoriyalar</Typography>
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
            <TableRow key={category._id}>
              <TableCell>
                <img src={url + '/' + category.image} width="80px" alt="" />{' '}
              </TableCell>
              <TableCell>{category._id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Link to={'categories/' + category._id + '/subcategories'}>
                  <Button variant="contained" color="primary" sx={{ m: 2 }}>
                    View
                  </Button>
                </Link>
                <Button
                  sx={{ m: 2 }}
                  variant="outlined"
                  onClick={() => {
                    setSelectedCategoryId(category._id)
                    setUpdateFormOpen(true)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setSelectedCategoryId(category._id)
                    setDeleteDialogOpen(true)
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Kategoriyani o'chirish</DialogTitle>
        <DialogContent>
          <Typography>
            Siz rostdan ham kategoriyani o'chirmoqchimisiz?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleDeleteButtonClick(selectedCategoryId)
              setDeleteDialogOpen(false)
            }}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isUpdateFormOpen} onClose={() => setUpdateFormOpen(false)}>
        <DialogTitle>Kategoriyani o'zgartirish</DialogTitle>
        <DialogContent>
          <EditCategoryForm
            handleCategoryImageChange={handleCategoryImageChange}
            handleCategoryNameChange={handleCategoryNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateFormOpen(false)}>Cancel</Button>
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
