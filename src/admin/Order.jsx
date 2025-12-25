import React, { useEffect, useState } from "react";
import API_URL from "../utils/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch(`${API_URL}/api/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchOrders();
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 text-center">
        📦 Customer Orders
      </h1>

      {loading ? (
        <div className="text-center text-gray-500 text-lg mt-20">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">No orders found.</div>
      ) : (
        <div className="grid gap-6 max-w-5xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 p-4 sm:p-6 space-y-4"
            >
              {/* Top Section */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 break-all">
                  Order ID: <span className="text-gray-600">{order._id}</span>
                </h2>

                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`text-sm px-3 py-2 rounded-full font-medium w-full md:w-auto ${getStatusColor(order.status)}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Customer:</span> {order.customer.name} ({order.customer.phone})
                </p>
                <p>
                  <span className="font-medium">Payment:</span> {order.customer.paymentMethod}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-medium">Address:</span> {order.customer.address}, {order.customer.landmark}, {order.customer.city}
                </p>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🛒 Items</h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row justify-between bg-gray-50 p-3 rounded-md border items-center text-sm">
                      <p className="font-medium text-gray-700">{item.name}</p>
                      <p className="text-gray-600">{item.quantity} {item.unit}</p>
                      <p className="font-semibold text-gray-800">₹{item.price.toFixed(2)} each</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-end text-right text-gray-800 font-semibold text-base">
                Total: ₹{order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
