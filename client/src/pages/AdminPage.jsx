import React, { useState } from 'react'

function AdminPage() {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productImage, setProductImage] = useState('')
  const [productCategory, setProductCategory] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Prepare the form data object
    const formData = {
      productName,
      productPrice,
      productDescription,
      productImage,
      productCategory,
    }

    // Perform the form submission or data handling logic here
    // You can make an API request to send the form data to the server
    // Example using fetch API:
    fetch('/api/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data) // You can display a success message or perform any other actions
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error)
      })

    // Reset the form fields after submission
    setProductName('')
    setProductPrice('')
    setProductDescription('')
    setProductImage('')
    setProductCategory('')
  }

  return (
    <>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">ProductName</label>
        <input
          type="text"
          name="productName"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label htmlFor="productPrice">ProductPrice</label>
        <input
          type="text"
          name="productPrice"
          id="productPrice"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />

        <label htmlFor="productDescription">ProductDescription</label>
        <input
          type="text"
          name="productDescription"
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />

        <label htmlFor="productImage">ProductImage</label>
        <input
          type="text"
          name="productImage"
          id="productImage"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
        />

        <label htmlFor="productCategory">ProductCategory</label>
        <select
          name="productCategory"
          id="productCategory"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default AdminPage
