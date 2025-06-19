import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StorContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-12 mt-16 px-4 md:px-8 max-w-5xl mx-auto"
    >
      <div className="flex-1 bg-white rounded-xl shadow p-8">
        <p className="text-2xl font-bold mb-8 text-primary">
          Delivery Information
        </p>
        <div className="flex gap-4 mb-4">
          <label className="flex-1">
            <span className="block mb-1 font-medium">First name</span>
            <input
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First name"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
            />
          </label>
          <label className="flex-1">
            <span className="block mb-1 font-medium">Last name</span>
            <input
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last name"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
            />
          </label>
        </div>
        <label className="block mb-4">
          <span className="block mb-1 font-medium">Email address</span>
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email address"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
          />
        </label>
        <label className="block mb-4">
          <span className="block mb-1 font-medium">Street</span>
          <input
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
          />
        </label>
        <div className="flex gap-4 mb-4">
          <label className="flex-1">
            <span className="block mb-1 font-medium">City</span>
            <input
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
            />
          </label>
          <label className="flex-1">
            <span className="block mb-1 font-medium">State</span>
            <input
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
            />
          </label>
        </div>
        <div className="flex gap-4 mb-4">
          <label className="flex-1">
            <span className="block mb-1 font-medium">Zip code</span>
            <input
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              placeholder="Zip code"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
            />
          </label>
          <label className="flex-1">
            <span className="block mb-1 font-medium">Country</span>
            <input
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
            />
          </label>
        </div>
        <label className="block mb-4">
          <span className="block mb-1 font-medium">Phone</span>
          <input
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
          />
        </label>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow p-8 h-fit">
        <div className="mb-8">
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
        </div>
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg shadow transition"
        >
          PROCEED TO PAYMENT
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
