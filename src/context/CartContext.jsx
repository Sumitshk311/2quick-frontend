import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 🔹 Logged-in user (Google login se)
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 User-wise cart key
  const CART_KEY = user?.email
    ? `cart_2quick_${user.email}`
    : "cart_2quick_guest";

  // 🔹 Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem(CART_KEY);
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to parse cart items:", error);
      return [];
    }
  });

  // 🔹 Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems, CART_KEY]);

  // ➕ Add to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // ➕ Increase quantity
  const increaseQuantity = (_id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === _id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ Decrease quantity (1 se niche gaya to remove)
  const decreaseQuantity = (_id) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i._id === _id);

      if (item && item.quantity > 1) {
        return prevItems.map((i) =>
          i._id === _id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }

      return prevItems.filter((i) => i._id !== _id);
    });
  };

  // 🗑 Remove item
  const removeItem = (_id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== _id)
    );
  };

  // 🧹 Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_KEY);
  };

  // 🔢 Cart badge count
  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        getTotalCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
