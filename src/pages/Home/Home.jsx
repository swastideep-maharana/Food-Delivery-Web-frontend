import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <Header />
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-12 mt-8 gap-4">
        <ExploreMenu category={category} setCategory={setCategory} />
        <div className="w-full md:w-1/3 flex items-center bg-white rounded-lg shadow px-4 py-2 border border-gray-200">
          <input
            type="text"
            placeholder="Search for food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent text-lg px-2 py-1"
          />
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </div>
      </div>
      <FoodDisplay category={category} search={search} />
      <AppDownload />
    </div>
  );
};

export default Home;
