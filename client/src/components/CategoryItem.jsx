import { Link } from 'react-router-dom'
const CategoryItem = ({ item }) => {
  const url = process.env.REACT_APP_API_URL

  return (
    <Link
      to={`/categories/${item._id}`}
      className="category-item"
      style={{ backgroundImage: `url(${url + '/' + item.image})` }}
    >
      <span>{item.name}</span>
    </Link>
  )
}
export default CategoryItem
