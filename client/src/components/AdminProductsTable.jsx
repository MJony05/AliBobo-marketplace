import { getProducts, getCategory, createProduct } from '../services/api'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
import AddProductForm from './AddProductForm'
const AdminProductsTable = ({ categoryId, subcategoriesArray }) => {
  const [products, setProducts] = useState([])
  const [isAddFormOpen, setAddFormOpen] = useState(false)
  const [productCode, setProductCode] = useState('')
  const [productName, setProductName] = useState('')
  const [productImage, setProductImage] = useState(null)
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productSubcategory, setProductSubcategory] = useState('')
  const url = process.env.REACT_APP_API_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts(categoryId)
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchData()
  }, [categoryId])
  useEffect(() => {
    const fetchCategory = async () => {
      await getCategory(categoryId)
    }
    fetchCategory()
  }, [categoryId])
  const handleAddButtonClick = () => {
    setAddFormOpen(true)
  }
  const handleProductCodeChange = (code) => {
    setProductCode(code)
  }
  const handleProductNameChange = (name) => {
    setProductName(name)
  }
  const handleProductImageChange = (image) => {
    setProductImage(image)
  }
  const handleProductPriceChange = (price) => {
    setProductPrice(price)
  }
  const handleProductDescriptionChange = (description) => {
    setProductDescription(description)
  }
  const handleProductSubcategoryChange = (subcategory) => {
    setProductSubcategory(subcategory)
  }
  const handleAddProduct = async () => {
    const formData = new FormData()
    formData.append('code', productCode)
    formData.append('name', productName)
    formData.append('image', productImage)
    formData.append('price', productPrice)
    formData.append('description', productDescription)
    formData.append('subcategory', productSubcategory)
    try {
      await createProduct(categoryId, formData)
      setAddFormOpen(false)
    } catch (error) {
      console.error('Error creating category:', error)
    }
    console.log('formData:', formData)
  }
  return (
    <div>
      <h1>Admin Products Table</h1>
      <TableContainer component={Paper}>
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Link to="/admin">
              <Typography variant="subtitle1"> &#8592; categories</Typography>
            </Link>
            <Typography variant="h6">Products</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddButtonClick()}
            >
              Add Product
            </Button>
          </Grid>
        </Toolbar>
        <Table>
          <Dialog open={isAddFormOpen} onClose={() => setAddFormOpen(false)}>
            <DialogTitle>SubKategoriya qoshish</DialogTitle>
            <DialogContent>
              <AddProductForm
                handleProductCodeChange={handleProductCodeChange}
                handleProductNameChange={handleProductNameChange}
                handleProductImageChange={handleProductImageChange}
                handleProductPriceChange={handleProductPriceChange}
                handleProductDescriptionChange={handleProductDescriptionChange}
                handleProductSubCategoryChange={handleProductSubcategoryChange}
                subcategoriesArray={subcategoriesArray}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAddFormOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  handleAddProduct()
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
              <TableCell>Kod</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.length !== 0 ? (
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <img
                      src={`${url}/${product.image}`}
                      alt={product.name}
                      style={{ width: '100px' }}
                    />
                  </TableCell>
                  <TableCell>{product.price} so'm</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>
                    {product.subcategory ? product.subcategory.name : '__'}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>No products found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AdminProductsTable
