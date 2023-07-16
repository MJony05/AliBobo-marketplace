import React from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { MuiFileInput } from 'mui-file-input'

const AddProductForm = ({
  handleProductCodeChange,
  handleProductImageChange,
  handleProductNameChange,
  handleProductPriceChange,
  handleProductDescriptionChange,
  handleProductSubCategoryChange,
  subcategoriesArray,
}) => {
  const [file, setFile] = React.useState(null)
  React.useEffect(() => {
    if (file) {
      handleProductImageChange(file)
    }
  }, [file, handleProductImageChange])
  const handleChange = (newFile) => {
    setFile(newFile)
  }
  const [subcategories, setSubcategories] = React.useState(subcategoriesArray)
  React.useEffect(() => {
    setSubcategories(subcategoriesArray)
  }, [subcategoriesArray])
  const [selectedSubcategory, setSelectedSubcategory] = React.useState('')

  const handleSubcategoryChange = (value) => {
    setSelectedSubcategory(value)
    handleProductSubCategoryChange(value)
  }

  return (
    <form style={{ maxWidth: '300px' }} encType="multipart/form-data">
      <TextField
        label="Mahsulot kodi"
        sx={{ m: '20px 0' }}
        onChange={(e) => handleProductCodeChange(e.target.value)}
      />
      <TextField
        label="Mahsulot nomi"
        sx={{ m: '20px 0' }}
        onChange={(e) => handleProductNameChange(e.target.value)}
      />
      <TextField
        label="Mahsulot narxi"
        sx={{ m: '20px 0' }}
        onChange={(e) => handleProductPriceChange(e.target.value)}
      />
      <TextField
        label="Mahsulot tavsifi"
        sx={{ m: '20px 0' }}
        onChange={(e) => handleProductDescriptionChange(e.target.value)}
      />
      <FormControl sx={{ minWidth: '100%' }}>
        <InputLabel id="demo-simple-select-label">
          Mahsulot sabkategoriyasi
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Mahsulot sabkategoriyasi"
          onChange={(e) => handleSubcategoryChange(e.target.value)}
          value={selectedSubcategory} // Set default value
        >
          <MenuItem value="">none</MenuItem>
          {subcategories &&
            subcategories.length > 0 &&
            subcategories.map((subcategory) => (
              <MenuItem key={subcategory} value={subcategory}>
                {subcategory}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <MuiFileInput
        value={file}
        label="Rasm yuklash"
        onChange={handleChange}
        sx={{ width: '100%', m: '20px 0' }}
        inputProps={{
          accept: 'image/*',
        }}
      />
    </form>
  )
}
export default AddProductForm
