import { Link } from 'react-router-dom'
const SubCategoryItem = ({ subcategory }) => {
  const url = process.env.REACT_APP_API_URL
  console.log(subcategory)
  return (
    <Link
      to={`/categories/${subcategory.category}/subcategories/${subcategory._id}/products`}
      style={{ backgroundImage: `url(${url + '/' + subcategory.image})` }}
      className="category-item"
    >
      <span>{subcategory.name}</span>
    </Link>
  )
}

export default SubCategoryItem
