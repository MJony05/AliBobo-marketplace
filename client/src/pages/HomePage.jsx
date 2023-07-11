import React from 'react'
import './homepage.css'
import MainSection from '../components/MainSection'
import CategoryList from '../components/CategoryList'
const HomePage = () => {
  return (
    <div className="homepage">
      <MainSection />
      <div className="category-section">
        <div className="container">
          <h1 className="section-title">Order in Minutes & Save Hours</h1>
          <CategoryList />
        </div>
      </div>
    </div>
  )
}

export default HomePage
