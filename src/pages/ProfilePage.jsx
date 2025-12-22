import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  // 🔹 Logged-in user (Google login se)
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  const userName = user.name || "User";
  const userEmail = user.email || "Not available";

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-emerald-100">
        
        {/* 🌟 Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-28 h-28 bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center rounded-full text-5xl font-bold shadow-lg mb-4">
            {userName.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800">
            Welcome, <span className="text-emerald-600">{userName}</span> 👋
          </h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-2">
            <FaEnvelope /> {userEmail}
          </p>
        </div>

        {/* 📦 Actions */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/myorders")}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-emerald-50 transition text-gray-700 font-medium"
          >
            <FaBoxOpen className="text-emerald-600 text-xl" />
            <span>My Orders</span>
          </button>

          <button
            onClick={() => alert("Address management coming soon!")}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-emerald-50 transition text-gray-700 font-medium"
          >
            <FaMapMarkerAlt className="text-emerald-600 text-xl" />
            <span>Saved Address</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 transition text-red-600 font-semibold"
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
