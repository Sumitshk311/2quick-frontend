import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Utility to convert category name to URL-friendly slug
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -

const AllCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-700 mb-8 text-center">
          All Categories
        </h1>

        {categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                to={`/category/${category.route}`}
                key={category._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-xl transition group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-20 h-20 object-contain mb-4 transform group-hover:scale-110 transition"
                />
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 text-center">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllCategories;
