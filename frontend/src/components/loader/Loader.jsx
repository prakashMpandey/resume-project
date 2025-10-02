import React from "react";
import Container from "../Container";
 

const Loader = () => {
  return (

  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
  </div>
  );
};

export default Loader;
