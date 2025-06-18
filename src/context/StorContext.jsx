import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = "https://food-delivery-backend-bycx.onrender.com";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
        // Revert the local state if API call fails
        setCartItems((prev) => {
          const updatedCart = { ...prev };
          if (updatedCart[itemId] > 1) {
            updatedCart[itemId] -= 1;
          } else {
            delete updatedCart[itemId];
          }
          return updatedCart;
        });
      }
    }
  };

  const removeFromCart = async (itemId) => {
    const previousCount = cartItems[itemId] || 0;
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
        // Revert the local state if API call fails
        setCartItems((prev) => ({
          ...prev,
          [itemId]: previousCount,
        }));
      }
    }
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, item) => {
      const itemInfo = food_list.find((product) => product._id === item);
      return itemInfo ? total + itemInfo.price * cartItems[item] : total;
    }, 0);
  };

  const fetchFoodList = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data || response.data || []);
    } catch (err) {
      console.error("Error fetching food list:", err);
      setError(true);
      setFoodList([]);
    } finally {
      setLoading(false);
    }
  }, [url]);

  const loadCardData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Error loading cart data:", error);
      setCartItems({});
    }
  };

  const retryFetchFoodList = () => {
    fetchFoodList();
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, [fetchFoodList]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    error,
    loading,
    retryFetchFoodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
