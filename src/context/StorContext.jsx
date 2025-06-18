import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const addToCart = useCallback(
    async (itemId) => {
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
        }
      }
    },
    [token, url]
  );

  const removeFromCart = useCallback(
    async (itemId) => {
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
        }
      }
    },
    [token, url]
  );

  const getTotalCartAmount = useMemo(() => {
    return Object.keys(cartItems).reduce((total, item) => {
      const itemInfo = food_list.find((product) => product._id === item);
      return itemInfo ? total + itemInfo.price * cartItems[item] : total;
    }, 0);
  }, [cartItems, food_list]);

  const fetchFoodList = useCallback(
    async (page = 1, append = false) => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(
          `${url}/api/food/list?page=${page}&limit=12`
        );
        const { data, total, pages } = response.data;

        if (append) {
          setFoodList((prev) => [...prev, ...data]);
        } else {
          setFoodList(data);
        }

        setCurrentPage(page);
        setTotalPages(pages);
        setHasMore(page < pages);
      } catch (err) {
        console.error("Error fetching food list:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  const loadMoreFood = useCallback(() => {
    if (!loading && hasMore) {
      fetchFoodList(currentPage + 1, true);
    }
  }, [loading, hasMore, currentPage, fetchFoodList]);

  const loadCardData = useCallback(
    async (token) => {
      try {
        const response = await axios.post(
          url + "/api/cart/get",
          {},
          { headers: { token } }
        );
        setCartItems(response.data.cartData);
      } catch (error) {
        console.error("Error loading cart data:", error);
      }
    },
    [url]
  );

  useEffect(() => {
    async function loadData() {
      await fetchFoodList(1, false);
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, [fetchFoodList, loadCardData]);

  const contextValue = useMemo(
    () => ({
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
      hasMore,
      loadMoreFood,
      currentPage,
      totalPages,
    }),
    [
      food_list,
      cartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken,
      error,
      loading,
      hasMore,
      loadMoreFood,
      currentPage,
      totalPages,
    ]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
