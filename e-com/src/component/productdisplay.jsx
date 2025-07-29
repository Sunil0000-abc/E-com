import React from "react";
import { Link } from "react-router-dom";
import all_product from "../assets/product"; // If you want it to be dynamic, accept props

const Productdisplay = ({ products = all_product }) => {
  return (
    <div className="flex items-center flex-col">
      <h1 className="text-2xl">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {products.map((item, idx) => (
          <Link to={`/product/${item.id}`} key={idx}>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 ease-in-out text-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-44 h-44 object-contain mx-auto mb-4 "
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {item.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2 capitalize">
                {item.category}
              </p>
              <div className="text-lg font-bold text-[#1e293b]">
                ₹{item.new_price.toFixed(2)}{" "}
                <span className="line-through text-gray-400 ml-2 text-sm">
                  ₹{item.old_price.toFixed(2)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Productdisplay;
