import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBoxOpen, FaListAlt, FaUser, FaSearch } from "react-icons/fa";

const ActionBar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome size={18} /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen size={18} /> },
    { name: "Search", path: "/search", icon: <FaSearch size={18} /> },
    { name: "Categories", path: "/categories", icon: <FaListAlt size={18} /> },
    { name: "Profile", path: "/profile", icon: <FaUser size={18} /> },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-white/80 shadow-xl rounded-full flex justify-around items-center px-2 py-3 w-[92%] max-w-md border border-gray-200 z-50 transition-all duration-300">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center justify-center text-sm relative group transition-all duration-200 ${
              isActive ? "text-emerald-600 font-semibold" : "text-gray-500"
            }`}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-emerald-100 scale-110 shadow-md"
                  : "group-hover:bg-gray-100"
              }`}
            >
              {item.icon}
            </div>
            <span className="text-xs mt-1">{item.name}</span>

            {isActive && (
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-md animate-ping"></span>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default ActionBar;
