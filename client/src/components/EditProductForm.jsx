import { useState } from 'react'
import { TextField } from '@mui/material'
import { MuiFileInput } from 'mui-file-input'
const EditProductForm = ({
  product,
  handleProductCodeChange,
  handleProductNameChange,
  handleProductPriceChange,
  handleProductDescriptionChange,
  handleProductSubcategoryChange,
  handleProductImageChange,
}) => {
  const [code, setCode] = useState(product.code)
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [description, setDescription] = useState(product.description)
  const [subcategory, setSubcategory] = useState(product.subcategory?.name)
  const [file, setFile] = useState(product.image)

  const ProductCode = (e) => {
    setCode(e.target.value)
    handleProductCodeChange(e.target.value)
  }
  const ProductName = (e) => {
    setName(e.target.value)
    handleProductNameChange(e.target.value)
  }
  const ProductPrice = (e) => {
    setPrice(e.target.value)
    handleProductPriceChange(e.target.value)
  }
  const ProductDescription = (e) => {
    setDescription(e.target.value)
    handleProductDescriptionChange(e.target.value)
  }
  const ProductSubcategory = (e) => {
    setSubcategory(e.target.value)
    handleProductSubcategoryChange(e.target.value)
  }
  const ProductImage = (e) => {
    setFile(e)
    handleProductImageChange(e)
  }

  return (
    <form style={{ maxWidth: '300px' }} encType="multipart/form-data">
      <TextField
        label="Kod"
        value={code}
        onChange={ProductCode}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Nomi"
        value={name}
        onChange={ProductName}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Narxi"
        value={price}
        onChange={ProductPrice}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Tavsifi"
        value={description}
        onChange={ProductDescription}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Subkategoriyasi"
        value={subcategory}
        onChange={ProductSubcategory}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <MuiFileInput
        value={file}
        label="Rasm yuklash"
        onChange={ProductImage}
        sx={{ width: '100%', m: '20px 0' }}
        inputProps={{
          accept: 'image/*',
        }}
      />
    </form>
  )
}

export default EditProductForm
