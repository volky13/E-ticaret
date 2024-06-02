import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartProvider";
import "./ProductItem.css";
import { Link } from "react-router-dom";
import { message } from "antd";

const ProductItem = ({ productItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === productItem._id
  );
  const originalPrice = productItem.price.current;
  const discountPercentage = productItem.price.discount;
  let discountedPrice = originalPrice;
  if (discountPercentage)
    discountedPrice = originalPrice - (originalPrice * discountPercentage) / 100;

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const id = userData.id || userData._id;
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorite/list/${id}`);
        const data = await response.json();
        const isFav = data.favorites.some(favorite => favorite.productId._id === productItem._id);
        setIsFavorite(isFav);
      } catch (error) {
        console.error(error);
      }
    };

    checkFavoriteStatus();
  }, [productItem._id]);

  const handleAddToFavorites = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const id = userData.id || userData._id;
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/favorite/${isFavorite ? 'remove' : 'add'}`;
      const method = isFavorite ? 'DELETE' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          productId: productItem._id,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setIsFavorite(!isFavorite);
      message.success(`Ürün favorilerden ${isFavorite ? 'çıkarıldı' : 'eklendi'}`);
    } catch (error) {
      message.error('Favori işlemi sırasında bir hata oluştu');
    }
  };

  return (
      <div className="product-item glide__slide glide__slide--active">
        <Link to={`product/${productItem._id}`} className="product-link">
        <div className="product-image">
          <a href="#">
            <img src={productItem.img[0]} alt="" className="img1" />
            <img src={productItem.img[1]} alt="" className="img2" />
          </a>
        </div>
        </Link>
        <div className="product-info">
          <a href="#" className="product-title">
            {productItem.name}
          </a>
          <ul className="product-star">
            <li>
              <i className="bi bi-star-fill"></i>
            </li>
            <li>
              <i className="bi bi-star-fill"></i>
            </li>
            <li>
              <i className="bi bi-star-fill"></i>
            </li>
            <li>
              <i className="bi bi-star-fill"></i>
            </li>
            <li>
              <i className="bi bi-star-half"></i>
            </li>
          </ul>
          <div className="product-prices">
            <strong className="new-price">₺{discountedPrice}</strong>
            <span className="old-price">₺{originalPrice}</span>
          </div>
          <span className="product-discount">{discountPercentage ? '-' + discountPercentage + '%' : ''}</span>
          <div className="product-links">
            <button
              className="add-to-cart"
              onClick={() =>
                addToCart({
                  ...productItem,
                  price: discountedPrice,
                })
              }
              disabled={filteredCart}
            >
              <i className="bi bi-basket-fill"></i>
            </button>
            <button onClick={handleAddToFavorites} className={isFavorite ? "favorite active" : "favorite"}>
              <i className="bi bi-heart-fill"></i>
            </button>

            <Link to={`product/${productItem._id}`} className="product-link">
              <i className={`bi bi-eye-fill`}></i>
            </Link>
            <a href="#">
              <i className="bi bi-share-fill"></i>
            </a>
          </div>
        </div>
      </div>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  productItem: PropTypes.object.isRequired,
};
