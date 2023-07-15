import SubCategoryItem from './SubcategoryItem'
import './category.css'
const SubCategoryList = ({ subcategories }) => {
  return (
    <div className="categories">
      <div className="container">
        <ul className="category-list">
          {subcategories.map((subcategory) => (
            <SubCategoryItem key={subcategory._id} subcategory={subcategory} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SubCategoryList
