import React, { useState } from 'react'

function OrderForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ name, phone })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default OrderForm
