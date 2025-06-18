import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StorContext";
import FoodItem from "../FoodItem/FoodItem";
import { InfinitySpin } from "react-loader-spinner";

const FoodDisplay = ({ category }) => {
  const { food_list, loading, error } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      {!food_list.length || loading ? (
        !error ? (
          <div className="food-display-list">
            <InfinitySpin
              visible={true}
              width="200"
              color="tomato"
              ariaLabel="infinity-spin-loading"
            />
          </div>
        ) : (
          <p style={{ color: "red" }}>Failed to fetch Items</p>
        )
      ) : (
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
