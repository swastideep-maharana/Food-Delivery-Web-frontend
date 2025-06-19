import React, { useContext } from "react";
import { StoreContext } from "../../context/StorContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="mt-16 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="grid grid-cols-6 gap-4 font-semibold text-gray-700 bg-gray-50 rounded-t-lg py-3 px-2">
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr className="my-2" />
        {food_list.filter((item) => cartItems[item._id] > 0).length === 0 ? (
          <p className="text-center text-gray-400 py-8">Your cart is empty.</p>
        ) : (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div
                  key={item._id || index}
                  className="grid grid-cols-6 gap-4 items-center py-3 border-b last:border-b-0"
                >
                  <img
                    src={url + "/images/" + item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                  <p className="font-medium">{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 font-bold text-lg"
                  >
                    ×
                  </button>
                </div>
              );
            }
            return null;
          })
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Cart Totals</h2>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>$2</p>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/order")}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg shadow transition"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="flex-1 bg-white rounded-xl shadow p-6 mb-8">
          <p className="mb-2 text-gray-700">
            If you have a promo code, enter it here:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
            />
            <button className="bg-gray-900 hover:bg-primary text-white px-6 py-2 rounded-lg font-semibold transition">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
