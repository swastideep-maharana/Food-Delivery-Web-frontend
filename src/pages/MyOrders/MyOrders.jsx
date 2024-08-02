import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StorContext";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";

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
          {data.map((order) => (
            <li key={order._id} className="order-item">
              <p>Order ID: {order._id}</p>
              <p>Total Amount: ${order.amount}</p>
              <p>
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>Status: {order.status}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.name} - {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
