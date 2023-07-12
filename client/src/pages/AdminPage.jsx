import React from 'react'
import AdminCategoriesTable from '../components/AdminCategoriesTable'
import './admin.css'
const AdminPage = () => {
  return (
    <div className="admin-page">
      <div className="container">
        <h1>Admin Page</h1>
        <AdminCategoriesTable />
      </div>
    </div>
  )
}

export default AdminPage
