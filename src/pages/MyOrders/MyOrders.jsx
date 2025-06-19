import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StorContext";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import parcelIcon from "../../assets/parcel_icon.png";

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
    } catch (err) {
      setError(err);
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
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <h1 className="text-3xl font-bold mb-4">My Orders</h1>
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
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>
      {data.length === 0 ? (
        error ? (
          <p className="text-red-500 text-center">{error.message}</p>
        ) : (
          <p className="text-gray-400 text-center">No orders found</p>
        )
      ) : (
        <ul className="flex flex-col gap-6">
          {data.map((order, index) => (
            <li
              key={index}
              className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center gap-4"
            >
              <img
                src={parcelIcon}
                alt="Parcel Icon"
                className="w-12 h-12 mb-2 md:mb-0"
              />
              <div className="flex-1">
                <p className="font-semibold text-lg mb-1">
                  {order.items.map((item, idx) =>
                    idx === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `
                  )}
                </p>
                <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-2">
                  <span>${order.amount}.00</span>
                  <span>Items: {order.items.length}</span>
                  <span className="flex items-center gap-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${order.status === "Delivered" ? "bg-green-500" : "bg-yellow-400"}`}
                    ></span>
                    <b>{order.status}</b>
                  </span>
                </div>
              </div>
              <button
                onClick={fetchOrders}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition self-end md:self-auto"
              >
                Track Orders
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
