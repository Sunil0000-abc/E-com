import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import all_product from '../assets/product';
import { CartContext } from '../conteext/Cartcontext';

const ProductPage = () => {
  const { productId } = useParams();
  const product = all_product.find((item) => item.id.toString() === productId);
  const [selectedSize, setSelectedSize] = useState(null);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!product) return <div className="pt-24 p-6 text-center">Product not found.</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
    navigate('/cartPage'); // optional: redirect to cart
  };

  return (
    <div className="pt-24 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[450px] object-contain"
        />
      </div>

      <div>
        <h1 className="text-xl font-semibold text-gray-800 mb-4">{product.name}</h1>
        <div className="text-xl font-semibold text-gray-900 mb-4">
          ₹{product.new_price}
          <span className="ml-3 text-gray-400 line-through text-lg">₹{product.old_price}</span>
        </div>

        <p className="text-gray-600 mb-6 text-[12px]">Awesome product description here.</p>

        <div className="mb-6">
          <h3 className="mb-2 font-semibold text-gray-800">Select Size</h3>
          <div className="flex gap-3 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 ${
                  selectedSize === size
                    ? 'bg-black text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
