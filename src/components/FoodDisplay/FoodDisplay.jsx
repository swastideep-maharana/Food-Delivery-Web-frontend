import React, { useContext, useMemo, useCallback } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StorContext";
import FoodItem from "../FoodItem/FoodItem";
import { InfinitySpin } from "react-loader-spinner";

const FoodDisplay = ({ category }) => {
  const { food_list, loading, error, hasMore, loadMoreFood } =
    useContext(StoreContext);

  const filteredFoodList = useMemo(() => {
    return food_list.filter(
      (item) => category === "All" || category === item.category
    );
  }, [food_list, category]);

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
        <div className="food-display-list">
          <InfinitySpin
            visible={true}
            width="200"
            color="tomato"
            ariaLabel="infinity-spin-loading"
          />
        </div>
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
            <div className="loading-more">
              <InfinitySpin
                visible={true}
                width="100"
                color="tomato"
                ariaLabel="loading-more"
              />
              <p>Loading more items...</p>
            </div>
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
