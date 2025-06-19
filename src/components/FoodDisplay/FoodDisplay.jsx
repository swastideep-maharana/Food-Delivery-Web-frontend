import React, { useContext } from "react";
import { StoreContext } from "../../context/StorContext";
import FoodItem from "../FoodItem/FoodItem";
import { InfinitySpin } from "react-loader-spinner";

const FoodDisplay = ({ category, search = "" }) => {
  const { food_list, loading, error } = useContext(StoreContext);
  const filtered = food_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8" id="food-display">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Top dishes near you
      </h2>
      {!food_list.length || loading ? (
        !error ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <InfinitySpin
              visible={true}
              width="200"
              color="tomato"
              ariaLabel="infinity-spin-loading"
            />
          </div>
        ) : (
          <p className="text-red-500 text-center">Failed to fetch Items</p>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No food found.
            </p>
          ) : (
            filtered.map((item, index) => (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
