import React from 'react'
import { TextField } from '@mui/material'

const EditCategoryForm = ({ categoryId }) => {
  return (
    <form>
      <TextField label="Category ID" value={categoryId} />
    </form>
  )
}

export default EditCategoryForm
