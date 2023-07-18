import SubCategoryItem from './SubcategoryItem'
import './category.css'
const SubCategoryList = ({ subcategories }) => {
  return (
    <div className="categories">
      <ul className="category-list">
        {subcategories && subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <SubCategoryItem key={subcategory._id} subcategory={subcategory} />
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

export default SubCategoryList
