import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTrash,
  FaBoxOpen,
} from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const STANDARD_SHIPPING = 20;
const FREE_SHIPPING_THRESHOLD = 399;

// 🔹 Helper function to calculate unit with quantity
const formatUnit = (unit, quantity) => {
  const match = unit.match(/(\d+)([a-zA-Z]+)/);
  if (!match) return unit;

  const baseValue = parseInt(match[1]);
  const unitType = match[2];
  const totalValue = baseValue * quantity;

  return `${totalValue}${unitType}`;
};

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } =
    useContext(CartContext);

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0
      ? 0
      : STANDARD_SHIPPING;

  const total = subtotal + shipping;

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-10 flex items-center justify-center gap-3">
          <FaShoppingCart className="text-emerald-600 text-4xl" />
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-xl mx-auto">
            <FaBoxOpen className="text-emerald-500 text-7xl mx-auto mb-6 animate-bounce" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything yet. Start exploring our
              products!
            </p>
            <Link
              to="/products"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition transform hover:scale-105"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 🛒 Cart Items */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Items in Your Cart ({cartItems.length})
              </h2>

              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain border rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Unit: {formatUnit(item.unit, item.quantity)}
                        </p>
                        <p className="text-emerald-600 font-bold mt-1">
                          ₹{item.price.toFixed(2)} / each
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decreaseQuantity(item._id)}
                          className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                        >
                          <FaMinus />
                        </button>
                        <span className="font-semibold text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item._id)}
                          className="p-2 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <div className="text-center">
                        <p className="font-bold text-gray-800">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end sm:justify-center mt-3 sm:mt-0">
                      <button
                        onClick={() => removeItem(item._id)}
                        className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-full font-medium text-sm transition"
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 📦 Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-gray-700 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span
                    className={`font-semibold ${
                      shipping === 0 ? "text-emerald-600" : ""
                    }`}
                  >
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>

                {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Add ₹
                    {(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for
                    free shipping!
                  </p>
                )}

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-emerald-700">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      deliveryCharges: shipping,
                      subtotal,
                      total,
                    },
                  })
                }
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-full font-semibold transition transform hover:scale-105 mb-3"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center text-emerald-600 hover:text-emerald-800 font-medium hover:underline"
              >
                &larr; Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
