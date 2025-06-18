import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import "./LoadingSpinner.css";

const LoadingSpinner = ({
  size = "200",
  color = "tomato",
  text = "Loading...",
}) => {
  return (
    <div className="loading-spinner">
      <InfinitySpin
        visible={true}
        width={size}
        color={color}
        ariaLabel="loading-spinner"
      />
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
