import { useState, useEffect } from "react";
import { FaBoxOpen, FaSignOutAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const Profile = () => {

  const [user, setUser] = useState({
    name: "",
    email: ""
  });

  // Load user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Save user to localStorage
  const saveUser = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile Saved Successfully ✅");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-emerald-100">

        {/* Avatar */}
        <div className="text-center mb-6">
          <div className="mx-auto w-24 h-24 bg-emerald-500 text-white flex items-center justify-center rounded-full text-4xl font-bold">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
        </div>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter your name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full border p-3 rounded-lg mb-3"
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={saveUser}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold"
        >
          Save Profile
        </button>

        {/* Actions */}
        <div className="space-y-3 mt-6">
          <button className="w-full flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
            <FaBoxOpen /> My Orders
          </button>

          <button className="w-full flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
            <FaMapMarkerAlt /> Saved Address
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              alert("Data Deleted");
            }}
            className="w-full flex items-center gap-3 p-3 bg-red-100 text-red-600 rounded-lg"
          >
            <FaSignOutAlt /> Clear Profile
          </button>
        </div>

      </div>
    </section>
  );
};

export default Profile;
