import React, { useContext, useMemo, useCallback } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StorContext";
import FoodItem from "../FoodItem/FoodItem";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const FoodDisplay = ({ category }) => {
  const context = useContext(StoreContext);

  // Fallback if context is not available
  if (!context) {
    return (
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <LoadingSpinner size="200" text="Initializing..." />
      </div>
    );
  }

  const { food_list, loading, error, hasMore, loadMoreFood } = context;

  // Ensure food_list is always an array
  const safeFoodList = Array.isArray(food_list) ? food_list : [];

  const filteredFoodList = useMemo(() => {
    return safeFoodList.filter(
      (item) => category === "All" || category === item.category
    );
  }, [safeFoodList, category]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1000
    ) {
      loadMoreFood();
    }
  }, [loadMoreFood]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (error) {
    return (
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="error-message">
          <p style={{ color: "red" }}>
            Failed to fetch Items. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      {!filteredFoodList.length && loading ? (
        <LoadingSpinner size="200" text="Loading delicious food..." />
      ) : (
        <>
          <div className="food-display-list">
            {filteredFoodList.map((item, index) => (
              <FoodItem
                key={item._id || index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
          {loading && (
            <LoadingSpinner size="100" text="Loading more items..." />
          )}
          {!hasMore && filteredFoodList.length > 0 && (
            <div className="no-more-items">
              <p>No more items to load</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(FoodDisplay);
