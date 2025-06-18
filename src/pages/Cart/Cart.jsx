import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StorContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const navigate = useNavigate();

  const cartItemsList = food_list.filter((item) => cartItems[item._id] > 0);
  const subtotal = getTotalCartAmount();
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (promoCode.trim()) {
      setPromoApplied(true);
      // Here you would typically validate the promo code with the backend
    }
  };

  const handleCheckout = () => {
    if (cartItemsList.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/order");
  };

  if (cartItemsList.length === 0) {
    return (
      <div className="cart">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some delicious food to get started!</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id || index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            {promoApplied && (
              <>
                <hr />
                <div className="cart-total-details">
                  <p>Promo Discount</p>
                  <p>-${Math.round(subtotal * 0.1)}</p>
                </div>
              </>
            )}
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${promoApplied ? total - Math.round(subtotal * 0.1) : total}
              </b>
            </div>
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <form onSubmit={handlePromoSubmit} className="cart-promocode-input">
              <input
                type="text"
                placeholder="promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button type="submit" disabled={!promoCode.trim()}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
