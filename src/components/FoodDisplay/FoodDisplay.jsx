import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StorContext";
import FoodItem from "../FoodItem/FoodItem";
import { InfinitySpin } from "react-loader-spinner";

const FoodDisplay = ({ category }) => {
  const { food_list, loading, error, retryFetchFoodList } =
    useContext(StoreContext);

  const filteredFoodList = food_list.filter(
    (item) => category === "All" || category === item.category
  );

  if (loading) {
    return (
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="loading-container">
          <InfinitySpin
            visible={true}
            width="200"
            color="#007bff"
            ariaLabel="infinity-spin-loading"
          />
          <p>Loading delicious food...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="error-container">
          <p>Failed to load food items. Please try again later.</p>
          <button className="retry-button" onClick={retryFetchFoodList}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!filteredFoodList.length) {
    return (
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="no-items-container">
          <p>No food items found for this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
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
    </div>
  );
};

export default FoodDisplay;
