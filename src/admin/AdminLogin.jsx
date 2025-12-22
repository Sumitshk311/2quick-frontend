import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const savedPassword =
      localStorage.getItem("adminPassword") || "admin123";

    if (password === savedPassword) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      alert("❌ Wrong Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white">
      <div className="bg-white p-8 rounded-2xl shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          🔐 Admin Login
        </h2>

        <input
          type="password"
          placeholder="Enter Admin Password"
          className="w-full p-3 border rounded-xl mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700"
        >
          Login
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Default password: <b>admin123</b>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
