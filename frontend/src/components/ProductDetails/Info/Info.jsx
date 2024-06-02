import PropTypes from "prop-types";
import "./Info.css";
import { useContext, useRef, useState, useEffect } from "react";
import { CartContext } from "../../../context/CartProvider";
import { message } from "antd";

const Info = ({ singleProduct }) => {
  const quantityRef = useRef();
  const { addToCart, cartItems } = useContext(CartContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const originalPrice = singleProduct.price.current;
  const discountPercentage = singleProduct.price.discount;
  let discountedPrice = originalPrice;
  if (discountPercentage)
    discountedPrice = originalPrice - (originalPrice * discountPercentage) / 100;

  const filteredCard = cartItems.find(cartItem => cartItem._id === singleProduct._id);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const id = userData.id || userData._id;
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorite/list/${id}`);
        const data = await response.json();
        const isFav = data.favorites.some(favorite => favorite.productId._id === singleProduct._id);
        setIsFavorite(isFav);
      } catch (error) {
        console.error(error);
      }
    };

    checkFavoriteStatus();
  }, [singleProduct._id]);

  const handleAddToFavorites = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const id = userData.id || userData._id;
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/favorite/${isFavorite ? 'remove' : 'add'}`;
      const method = isFavorite ? 'DELETE' : 'POST';
      console.log(userData);
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          productId: singleProduct._id,
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
    <div className="product-info">
      <h1 className="product-title">{singleProduct.name}</h1>
      <div className="product-price">
        <s className="old-price">₺{originalPrice}</s>
        <strong className="new-price">₺{discountedPrice}</strong>
      </div>
      <div className="product-description" dangerouslySetInnerHTML={{ __html: singleProduct.description }}></div>
      <form className="variations-form">
        <div className="variations">
          {singleProduct.colors && singleProduct.colors.length > 0 && (
            <div className="colors">
              <div className="colors-label"><span>Renk</span></div>
              <div className="colors-wrapper">
                {singleProduct.colors.map((color, index) => (
                  <div className="color-wrapper" key={index}>
                    <label style={{ backgroundColor: `#${color}` }}>
                      <input type="radio" name="product-color" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {singleProduct.sizes && singleProduct.sizes.length > 0 && (
            <div className="values">
              <div className="values-label"><span>Beden</span></div>
              <div className="values-list">
                {singleProduct.sizes.map((size, index) => (
                  <span key={index}>{size.toUpperCase()}</span>
                ))}
              </div>
            </div>
          )}
          <div className="cart-button">
            <input type="number" defaultValue="1" min="1" id="quantity" ref={quantityRef} />
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              disabled={filteredCard}
              onClick={() =>
                addToCart({
                  ...singleProduct,
                  price: discountedPrice,
                  quantity: parseInt(quantityRef.current.value),
                })
              }
            >
              Sepete ekle
            </button>
          </div>
          <div className="product-extra-buttons">
          <button onClick={handleAddToFavorites} className={isFavorite ? "favorite active" : "favorite"}>
              <i className="bi bi-heart-fill"></i>
              <span>favorilere ekle</span>
          </button>
          </div>
        </div>
      </form>
      <div className="divider"></div>
    </div>
  );
};

export default Info;

Info.propTypes = {
  singleProduct: PropTypes.object.isRequired,
};
