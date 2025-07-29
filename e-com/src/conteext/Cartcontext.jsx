// conteext/Cartcontext.js
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.size === size
    );

    if (existingIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        { ...product, size, quantity: 1 },
      ]);
    }
  };

  const increaseQty = (id, size) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id, size) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotalAmount = () =>
    cartItems.reduce((sum, item) => sum + item.new_price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, increaseQty, decreaseQty, getTotalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};
