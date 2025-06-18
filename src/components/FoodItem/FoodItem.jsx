import React, { useContext, useCallback, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StorContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const context = useContext(StoreContext);

  // Fallback if context is not available
  if (!context) {
    return (
      <div className="food-item">
        <div className="food-item-img-container">
          <div className="food-item-image-placeholder">
            <span>Loading...</span>
          </div>
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name || "Loading..."}</p>
          </div>
          <p className="food-item-desc">{description || "Loading..."}</p>
          <p className="food-item-price">${price || "0"}</p>
        </div>
      </div>
    );
  }

  const { cartItems, addToCart, removeFromCart, url } = context;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = useCallback(() => {
    addToCart(id);
  }, [addToCart, id]);

  const handleRemoveFromCart = useCallback(() => {
    removeFromCart(id);
  }, [removeFromCart, id]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {!imageError ? (
          <img
            className={`food-item-image ${imageLoaded ? "loaded" : "loading"}`}
            src={url + "/images/" + image}
            alt={name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="food-item-image-placeholder">
            <span>Image not available</span>
          </div>
        )}
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={handleRemoveFromCart}
              src={assets.remove_icon_red}
              alt="Remove from cart"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={handleAddToCart}
              src={assets.add_icon_green}
              alt="Add to cart"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default React.memo(FoodItem);
