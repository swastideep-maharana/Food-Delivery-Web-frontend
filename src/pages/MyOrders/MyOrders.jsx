import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StorContext";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import parcelIcon from "../../assets/parcel_icon.png"; // Adjust the import based on your file structure

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="my-orders">
        <h1>My Orders</h1>
        <InfinitySpin
          visible={true}
          width="200"
          color="tomato"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  return (
    <div className="my-orders">
      <h1>My Orders</h1>
      {data.length === 0 ? (
        error ? (
          <p style={{ color: "red" }}>{error.message}</p>
        ) : (
          <p>No orders found</p>
        )
      ) : (
        <ul>
          {data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={parcelIcon} alt="Parcel Icon" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items:{order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.status} </b>
              </p>
              <button onClick={fetchOrders}>Track Orders</button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
