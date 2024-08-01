import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StorContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    console.log(orderItems);

    if (token) {
      try {
        let orderData = {
          address: data,
          items: orderItems,
          amount: getTotalCartAmount() + 2,
        };
        const response = await axios.post(`${url}/api/order/place`, orderData, {
          headers: { token },
        });
        if (response.data.success) {
          const { session_url } = response.data;
          window.location.replace(session_url);
        } else {
          alert("Error");
        }
      } catch (error) {
        console.error("Failed to place order", error);
      }
    } else {
      console.error("User is not authenticated");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <label>
            First name:
            <input
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First name"
              required
            />
          </label>
          <label>
            Last name:
            <input
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last name"
              required
            />
          </label>
        </div>
        <label>
          Email address:
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email address"
            required
          />
        </label>
        <label>
          Street:
          <input
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
            required
          />
        </label>
        <div className="multi-fields">
          <label>
            City:
            <input
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
              required
            />
          </label>
          <label>
            State:
            <input
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
              required
            />
          </label>
        </div>
        <div className="multi-fields">
          <label>
            Zip code:
            <input
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              placeholder="Zip code"
              required
            />
          </label>
          <label>
            Country:
            <input
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
              required
            />
          </label>
        </div>
        <label>
          Phone:
          <input
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
            required
          />
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
