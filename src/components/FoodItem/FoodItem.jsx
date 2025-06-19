import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StorContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-200">
      <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
        <img
          className="w-full h-full object-cover rounded-full border-4 border-primary shadow"
          src={url + "/images/" + image}
          alt={name}
        />
        {!cartItems[id] ? (
          <button
            className="absolute bottom-2 right-2 bg-primary rounded-full p-2 shadow hover:bg-primary-dark transition"
            onClick={() => addToCart(id)}
          >
            <img className="w-6 h-6" src={assets.add_icon_white} alt="Add" />
          </button>
        ) : (
          <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-white rounded-full px-2 py-1 shadow">
            <button onClick={() => removeFromCart(id)}>
              <img
                className="w-6 h-6"
                src={assets.remove_icon_red}
                alt="Remove"
              />
            </button>
            <span className="font-bold text-primary text-lg">
              {cartItems[id]}
            </span>
            <button onClick={() => addToCart(id)}>
              <img className="w-6 h-6" src={assets.add_icon_green} alt="Add" />
            </button>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-lg text-gray-900">{name}</p>
          <img src={assets.rating_starts} alt="Rating" className="w-16 h-4" />
        </div>
        <p className="text-gray-500 text-center text-sm mb-2">{description}</p>
        <p className="text-primary font-bold text-xl">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
