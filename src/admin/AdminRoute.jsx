import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAuth = localStorage.getItem("adminAuth") === "true";
  return isAuth ? children : <Navigate to="/admin-login" />;
};

export default AdminRoute;
