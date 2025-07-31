import React, { useContext } from 'react';
import { CartContext } from '../conteext/Cartcontext';

const CartPage = () => {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    getTotalAmount,
  } = useContext(CartContext);

  if (cartItems.length === 0)
    return <div className="pt-24 p-6 text-center text-lg">Your cart is empty.</div>;

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      
      <div className="space-y-6">
        {cartItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 border-b pb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-contain rounded border"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">Size: {item.size}</p>
              <p className="text-sm font-semibold text-red-600">
                ₹{item.new_price}
              </p>

             
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decreaseQty(item.id, item.size)}
                  className="px-2 py-1 rounded bg-gray-300 text-sm"
                >
                  -
                </button>
                <span className="text-md font-medium">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id, item.size)}
                  className="px-2 py-1 rounded bg-gray-300 text-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      <div className="text-right mt-8 text-xl font-semibold">
        Subtotal: ₹{getTotalAmount().toFixed(2)}
      </div>

      
      <div className="text-right mt-4">
        <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
