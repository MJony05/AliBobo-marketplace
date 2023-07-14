import React from 'react'
import { TextField } from '@mui/material'
import { MuiFileInput } from 'mui-file-input'
const EditSubCategoryForm = ({
  handleSubCategoryImageChange,
  handleSubCategoryNameChange,
}) => {
  const [file, setFile] = React.useState(null)
  React.useEffect(() => {
    if (file) {
      handleSubCategoryImageChange(file)
    }
  }, [file, handleSubCategoryImageChange])
  const handleChange = (newFile) => {
    setFile(newFile)
  }
  return (
    <form style={{ maxWidth: '300px' }} encType="multipart/form-data">
      <TextField
        label="SabKategoriya nomi"
        sx={{ m: '20px 0' }}
        onChange={(e) => handleSubCategoryNameChange(e.target.value)}
      />
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

export default EditSubCategoryForm
