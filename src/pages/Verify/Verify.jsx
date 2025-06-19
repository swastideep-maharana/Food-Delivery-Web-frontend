import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StorContext";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderID = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderID,
      });
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white rounded-xl shadow p-8 mt-16 mx-auto max-w-lg">
      <div className="w-24 h-24 border-8 border-gray-200 border-t-primary rounded-full animate-spin mb-8"></div>
      <h1 className="text-2xl font-bold mb-2 text-primary">
        Verifying Payment...
      </h1>
      <p className="text-gray-600 text-center">
        Please wait while we verify your payment and update your order status.
      </p>
    </div>
  );
};

export default Verify;
