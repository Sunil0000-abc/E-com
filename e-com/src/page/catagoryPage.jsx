import React from "react";
import { useParams } from "react-router-dom";
import all_product from "../assets/product";
import Productdisplay from "../component/productdisplay";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const filteredProducts = all_product.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="pt-24 p-4">
      <h1 className="text-2xl font-semibold mb-4 capitalize flex items-center justify-center ">
        {categoryName} Collection
      </h1>
      <Productdisplay products={filteredProducts} />
    </div>
  );
};

export default CategoryPage;
