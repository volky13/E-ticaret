import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./CategoryItem.css";

const CategoryItem = ({ category }) => {
  return (
    <li className="category-item">
      <Link to={`/category/${category._id}`}>
        <img src={category.img} alt={category.name} className="category-image" />
        <span className="category-title">{category.name}</span>
      </Link>
    </li>
  );
};

export default CategoryItem;

CategoryItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    img: PropTypes.string,
  }).isRequired,
};
