import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, getTotalCartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Ballia",
    address: "",
    landmark: "",
    paymentMethod: "Cash on Delivery",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryCharges = subtotal >= 399 || subtotal === 0 ? 0 : 20;
  const total = subtotal + deliveryCharges;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
  const { name, phone, address, landmark, city, paymentMethod } = formData;

  if (!name || !phone || !address || !landmark) {
    setError("Please fill in all required fields.");
    return;
  }

  const orderPayload = {
    customer: { name, phone, city, address, landmark, paymentMethod },
    items: cartItems.map((item) => ({
      productId: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      unit: item.unit,
      image: item.image,
    })),
    subtotal,
    deliveryCharges,
    total,
  };

  try {
    setLoading(true);

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) throw new Error("Failed to place order");

    localStorage.setItem("userPhone", phone);  // ✅ Yahi important hai

    clearCart();
    navigate("/thank-you");
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h2>

        {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleChange}
            className="border rounded px-4 py-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded px-4 py-2"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Delivery Address
          </h3>
          <textarea
            name="address"
            placeholder="Street Address *"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 mb-3"
            rows={2}
          />
          <input
            type="text"
            name="landmark"
            placeholder="Nearby Landmark *"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 mt-2"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Payment Method
          </h3>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          >
            <option>Cash on Delivery</option>
            <option disabled>Online Payment (Coming Soon)</option>
          </select>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Cart Summary
          </h3>
          <div className="text-gray-700 space-y-2">
            <p>Total Items: {getTotalCartItems()}</p>
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Delivery Charges: ₹{deliveryCharges.toFixed(2)}</p>
            <hr />
            <p className="font-bold text-lg text-emerald-700">
              Grand Total: ₹{total.toFixed(2)}
            </p>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-full font-semibold transition"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </section>
  );
};

export default CheckoutPage;
