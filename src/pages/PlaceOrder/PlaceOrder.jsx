import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StorContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <label>
            First name:
            <input type="text" placeholder="First name" required />
          </label>
          <label>
            Last name:
            <input type="text" placeholder="Last name" required />
          </label>
        </div>
        <label>
          Email address:
          <input type="email" placeholder="Email address" required />
        </label>
        <label>
          Street:
          <input type="text" placeholder="Street" required />
        </label>
        <div className="multi-fields">
          <label>
            City:
            <input type="text" placeholder="City" required />
          </label>
          <label>
            State:
            <input type="text" placeholder="State" required />
          </label>
        </div>
        <div className="multi-fields">
          <label>
            Zip code:
            <input type="text" placeholder="Zip code" required />
          </label>
          <label>
            Country:
            <input type="text" placeholder="Country" required />
          </label>
        </div>
        <label>
          Phone:
          <input type="text" placeholder="Phone" required />
        </label>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>$2</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
