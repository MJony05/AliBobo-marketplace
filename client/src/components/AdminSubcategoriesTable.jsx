import React, { useState, useEffect } from 'react'
import {
  getSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
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
import { Link, useParams } from 'react-router-dom'
import AddSubCategoryForm from './AddSubCategoryForm'
import EditSubCategoryForm from './EditSubCategoryForm'
const AdminSubcategoriesTable = () => {
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false)
  const [isAddFormOpen, setAddFormOpen] = useState(false)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('')
  const [subcategoryName, setSubcategoryName] = useState('')
  const [subcategoryImage, setSubcategoryImage] = useState(null)
  const { categoryId } = useParams()
  const [subcategories, setSubcategories] = useState([])
  const url = process.env.REACT_APP_API_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getSubcategories(categoryId)
        setSubcategories(categoriesData)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchData()
  }, [categoryId])
  const handleSubCategoryNameChange = (name) => {
    setSubcategoryName(name)
  }
  const handleSubCategoryImageChange = (image) => {
    setSubcategoryImage(image)
  }
  const handleAddButtonClick = () => {
    setAddFormOpen(true)
  }
  const handleAddSubcategory = async () => {
    try {
      const formData = new FormData()
      formData.append('name', subcategoryName)
      formData.append('image', subcategoryImage)
      await createSubcategory(categoryId, formData)
      setAddFormOpen(false)
      const subcategoriesData = await getSubcategories(categoryId)
      setSubcategories(subcategoriesData)
    } catch (error) {
      console.error('Error adding subcategory:', error)
    }
  }

  const handleUpdateButtonClick = (id) => {
    setUpdateFormOpen(true)
    setSelectedSubcategoryId(id)
  }

  const handleUpdateSubcategory = async () => {
    try {
      const formData = new FormData()
      formData.append('name', subcategoryName)
      formData.append('image', subcategoryImage)
      await updateSubcategory(selectedSubcategoryId, formData)
      setUpdateFormOpen(false)
      const subcategoriesData = await getSubcategories(categoryId)
      setSubcategories(subcategoriesData)
    } catch (error) {
      console.error('Error updating subcategory:', error)
    }
  }

  const handleDeleteButtonClick = async (id) => {
    setSelectedSubcategoryId(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteSubcategory = async () => {
    try {
      await deleteSubcategory(selectedSubcategoryId)
      setDeleteDialogOpen(false)
      const subcategoriesData = await getSubcategories(categoryId)
      setSubcategories(subcategoriesData)
    } catch (error) {
      console.error('Error deleting subcategory:', error)
    }
  }

  return (
    <div className="admin-page">
      <div className="container">
        <h1>Admin Panel</h1>
        <TableContainer component={Paper} sx={{ padding: '0 32px' }}>
          <Toolbar>
            <Grid container justifyContent="space-between">
              <Link to="/admin">
                <Typography variant="subtitle1"> &#8592; categories</Typography>
              </Link>
              <Typography variant="h6">Subcategories</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddButtonClick()}
              >
                Add Subcategory
              </Button>
            </Grid>
          </Toolbar>
          <Table>
            <Dialog open={isAddFormOpen} onClose={() => setAddFormOpen(false)}>
              <DialogTitle>SubKategoriya qoshish</DialogTitle>
              <DialogContent>
                <AddSubCategoryForm
                  handleSubCategoryImageChange={handleSubCategoryImageChange}
                  handleSubCategoryNameChange={handleSubCategoryNameChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setAddFormOpen(false)}>Cancel</Button>
                <Button
                  onClick={() => {
                    handleAddSubcategory()
                    setAddFormOpen(false)
                  }}
                  color="success"
                  variant="outlined"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: '700' }}>
                  Subcategory Name
                </TableCell>
                <TableCell>Subcategory Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subcategories.length !== 0 ? (
                subcategories.map((subcategory) => (
                  <TableRow key={subcategory._id}>
                    <TableCell>{subcategory.name}</TableCell>
                    <TableCell>
                      <img
                        src={`${url}/${subcategory.image}`}
                        alt={subcategory.name}
                        style={{ width: '100px' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ m: '16px' }}
                        onClick={() => handleUpdateButtonClick(subcategory._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteButtonClick(subcategory._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No subcategories found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Dialog
            open={isDeleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>SabKategoriyani o'chirish</DialogTitle>
            <DialogContent>
              <Typography>
                Siz rostdan ham subkategoriyani o'chirmoqchimisiz?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleDeleteSubcategory()
                  setDeleteDialogOpen(false)
                }}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={isUpdateFormOpen}
            onClose={() => setUpdateFormOpen(false)}
          >
            <DialogTitle>Sab Kategoriyani o'zgartirish</DialogTitle>
            <DialogContent>
              <EditSubCategoryForm
                handleSubCategoryImageChange={handleSubCategoryImageChange}
                handleSubCategoryNameChange={handleSubCategoryNameChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setUpdateFormOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  handleUpdateSubcategory()
                  setUpdateFormOpen(false)
                }}
                variant="outlined"
                color="success"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
      </div>
    </div>
  )
}

export default AdminSubcategoriesTable
