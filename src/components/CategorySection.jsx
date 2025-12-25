import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api/api'; // ✅ ADD THIS

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`) // ✅ UPDATED
      .then(res => {
        console.log("Categories Response:", res.data);
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <Link
            to={`/category/${cat.route}`}
            key={cat._id}
            className="group border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-white overflow-hidden flex flex-col items-center p-4 text-center"
          >
            <div className="relative mb-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-28 w-28 object-cover rounded-full border-4 border-green-100 group-hover:border-green-500 transition-colors duration-300"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {cat.name}
            </h3>
            <p className="text-gray-600 text-sm hidden md:block">
              {cat.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
