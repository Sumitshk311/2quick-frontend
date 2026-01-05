import React, { useEffect, useState } from "react";

const API_URL = "https://twoquick-backend1.onrender.com";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get logged-in user
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    if (!email) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/orders/user/${email}`
        );
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // auto refresh

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-700">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center text-gray-500 text-lg">
          <p className="text-2xl mb-2">🛍️ No Orders Yet</p>
          <p>Looks like you haven’t placed any orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mb-10 text-center">
        🛒 My Orders
      </h1>

      <div className="space-y-10 max-w-4xl mx-auto">
        {orders.map((order, index) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Order #{index + 1}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium 
                ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              <p>
                <span className="font-medium">Payment Method:</span>{" "}
                {order.customer?.paymentMethod || "N/A"}
              </p>
            </div>

            <div className="mb-5">
              <h3 className="font-semibold text-gray-800 mb-3">🧾 Items</h3>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-md border"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-gray-500 text-sm">
                          {item.quantity} {item.unit} × ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="text-gray-800 font-semibold text-right">
                      ₹{(item.quantity * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-right text-gray-700 space-y-1 text-base border-t pt-4">
              <p>
                <span className="font-medium">Subtotal:</span> ₹
                {(order.subtotal || 0).toFixed(2)}
              </p>
              <p>
                <span className="font-medium">Delivery Charges:</span> ₹
                {(order.deliveryCharges || 0).toFixed(2)}
              </p>
              <p className="font-bold text-lg text-gray-900 mt-2">
                Total: ₹{(order.total || 0).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
