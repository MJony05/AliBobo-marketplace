import {
  getProducts,
  getCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api'
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
import EditProductForm from './EditProductForm'

const AdminProductsTable = ({ categoryId, subcategoriesArray }) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(null)
  const [isAddFormOpen, setAddFormOpen] = useState(false)
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productCode, setProductCode] = useState('')
  const [productName, setProductName] = useState('')
  const [productImage, setProductImage] = useState(null)
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productSubcategory, setProductSubcategory] = useState('')
  const [selectedProductId, setSelectedProductId] = useState('')
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

  const handleAddProduct = async () => {
    const formData = new FormData()
    formData.append('code', productCode)
    formData.append('name', productName)
    formData.append('image', productImage)
    formData.append('price', productPrice)
    formData.append('description', productDescription)
    if (productSubcategory !== null && productSubcategory !== undefined) {
      formData.append('subcategory', productSubcategory)
    }
    try {
      await createProduct(categoryId, formData)
      const productsData = await getProducts(categoryId)
      setProducts(productsData)
      setAddFormOpen(false)
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }
  const handleUpdateButtonClick = (id) => {
    const product = products.find((product) => product._id === id)
    setProduct(product)
    setUpdateFormOpen(true)
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
    console.log('subcategory', subcategory)
    const subcategoryValue = subcategory || null
    setProductSubcategory(subcategoryValue)
  }

  const handleUpdateProduct = async () => {
    const formData = new FormData()
    if (productCode) formData.append('code', productCode)
    if (productName) formData.append('name', productName)
    if (productImage) formData.append('image', productImage)
    if (productPrice) formData.append('price', productPrice)
    if (productDescription) formData.append('description', productDescription)
    if (productSubcategory !== null && productSubcategory !== undefined) {
      formData.append('subcategory', productSubcategory)
    }
    try {
      await updateProduct(product._id, formData)
      setUpdateFormOpen(false)
      const productsData = await getProducts(categoryId)
      setProducts(productsData)
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }
  const handleDeleteButtonClick = (id) => {
    setSelectedProductId(id)
    setDeleteDialogOpen(true)
  }
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(selectedProductId)
      setDeleteDialogOpen(false)
      const productsData = await getProducts(categoryId)
      setProducts(productsData)
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }
  return (
    <div>
      <h1>Admin Products Table</h1>
      <TableContainer component={Paper} sx={{ padding: '0 32px' }}>
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
            <DialogTitle>Mahsulot qoshish</DialogTitle>
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
          <Dialog
            open={isUpdateFormOpen}
            onClose={() => setUpdateFormOpen(false)}
          >
            <DialogTitle>Sab Kategoriyani o'zgartirish</DialogTitle>
            <DialogContent>
              <EditProductForm
                handleProductCodeChange={handleProductCodeChange}
                handleProductNameChange={handleProductNameChange}
                handleProductImageChange={handleProductImageChange}
                handleProductPriceChange={handleProductPriceChange}
                handleProductDescriptionChange={handleProductDescriptionChange}
                handleProductSubcategoryChange={handleProductSubcategoryChange}
                product={product}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setUpdateFormOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  handleUpdateProduct()
                  setUpdateFormOpen(false)
                }}
                variant="outlined"
                color="success"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={isDeleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Mahsulotni o'chirish</DialogTitle>
            <DialogContent>
              <Typography>
                Siz rostdan ham mahsulotni o'chirmoqchimisiz?
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
                  handleDeleteProduct()
                  setDeleteDialogOpen(false)
                }}
                variant="contained"
                color="error"
              >
                Delete
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
                    <Button
                      onClick={() => handleUpdateButtonClick(product._id)}
                      variant="contained"
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteButtonClick(product._id)}
                    >
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
