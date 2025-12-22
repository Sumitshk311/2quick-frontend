import { useState } from "react";

const AdminSettings = () => {
  const [newPassword, setNewPassword] = useState("");

  const updatePassword = () => {
    if (newPassword.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }
    localStorage.setItem("adminPassword", newPassword);
    alert("✅ Password Updated Successfully");
    setNewPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          ⚙️ Admin Settings
        </h2>

        <input
          type="password"
          placeholder="New Admin Password"
          className="w-full p-3 border rounded-xl mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={updatePassword}
          className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
