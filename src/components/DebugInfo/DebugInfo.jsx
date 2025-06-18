import React, { useContext } from "react";
import { StoreContext } from "../../context/StorContext";

const DebugInfo = () => {
  const context = useContext(StoreContext);

  console.log("Debug Info:", {
    contextExists: !!context,
    contextKeys: context ? Object.keys(context) : "No context",
    foodListLength: context?.food_list?.length || 0,
    loading: context?.loading,
    error: context?.error,
  });

  return null; // This component doesn't render anything
};

export default DebugInfo;
