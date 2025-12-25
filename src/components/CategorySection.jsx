import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../utils/api"; // ✅ ONLY THIS

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">
        Loading categories...
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">
        Shop by Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            to={`/category/${cat.route}`}
            className="group border rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 bg-white p-4 text-center"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-28 w-28 mx-auto object-cover rounded-full border-4 border-green-100 group-hover:border-green-500 transition"
            />
            <h3 className="mt-4 font-semibold text-lg text-gray-800">
              {cat.name}
            </h3>
            {cat.description && (
              <p className="text-sm text-gray-600 mt-1 hidden md:block">
                {cat.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
