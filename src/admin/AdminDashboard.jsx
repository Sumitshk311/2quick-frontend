import { Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaEdit,
  FaClipboardList,
  FaTools,
  FaTags,
} from "react-icons/fa";

const Card = ({ to, icon: Icon, title, desc, highlight }) => (
  <Link
    to={to}
    className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center border
    ${highlight ? "border-green-200 bg-green-50" : "border-gray-100"}
    hover:-translate-y-1`}
  >
    <div
      className={`w-14 h-14 flex items-center justify-center rounded-full mb-5
      ${highlight ? "bg-green-600 text-white" : "bg-emerald-100 text-emerald-600"}`}
    >
      <Icon className="text-2xl" />
    </div>

    <h3 className="text-lg font-semibold text-gray-800 mb-1">
      {title}
    </h3>
    <p className="text-sm text-gray-500">{desc}</p>
  </Link>
);

const AdminDashboard = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 mb-14">
          🛠️ Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          <Card
            to="/admin/add-product"
            icon={FaPlusCircle}
            title="Add Product"
            desc="Create a new product and add it to store"
          />

          <Card
            to="/admin/products/edit/:id"
            icon={FaEdit}
            title="Edit Products"
            desc="Update or delete existing products"
          />

          <Card
            to="/admin/order"
            icon={FaClipboardList}
            title="Manage Orders"
            desc="View and manage customer orders"
          />

          <Card
            to="/admin/offer"
            icon={FaTags}
            title="Manage Offers"
            desc="Home page offers, discounts & timer"
            highlight
          />

          <Card
            to="/admin/settings"
            icon={FaTools}
            title="Settings"
            desc="Change admin password & settings"
          />

        </div>

        <div className="mt-16 text-center text-gray-500 text-sm">
          Need more tools? Let’s expand your admin panel anytime.
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
