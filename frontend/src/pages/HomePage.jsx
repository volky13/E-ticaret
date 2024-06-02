import React from "react";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";



const HomePage = () => {
  return (
    <React.Fragment>
      <Categories />
      <Products />
    </React.Fragment>
  );
};

export default HomePage;
