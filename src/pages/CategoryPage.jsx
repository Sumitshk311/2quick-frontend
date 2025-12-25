import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import axios from "axios";

// ✅ API base URL from env (same as api.js)
const API_URL = import.meta.env.VITE_API_URL;

const categoryBanners = {
  default: "https://via.placeholder.com/1200x300?text=Category+Banner",
};

// Function to convert category to slug
const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/,/g, "")
    .replace(/\s+/g, "-")
    .trim();
};

// Function to convert slug to Display Name
const formatCategoryName = (slug) => {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace("And", "&");
};

const CategoryPage = () => {
  const { categoryName } = useParams(); // slug like: atta-rice-dal
  const displayCategoryName = formatCategoryName(categoryName);

  const [loading, setLoading] = useState(true);
  const [productsInCategory, setProductsInCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentCategoryBanner, setCurrentCategoryBanner] = useState(
    categoryBanners.default
  );
  const [sortBy, setSortBy] = useState("default");

  const { addToCart, removeItem, cartItems } = useContext(CartContext);

  // ✅ Fetch products
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${API_URL}/api/products`)
      .then((res) => {
        const allProducts = res.data;

        const filtered = allProducts.filter((product) => {
          if (!product.category) return false;
          return slugify(product.category) === categoryName.toLowerCase();
        });

        setProductsInCategory(filtered);
        setFilteredProducts(filtered);
        setCurrentCategoryBanner(
          categoryBanners[categoryName] || categoryBanners.default
        );
        setSortBy("default");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [categoryName]);

  // ✅ Sorting logic (same as before)
  useEffect(() => {
    let sorted = [...productsInCategory];

    if (sortBy === "price-low-to-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-to-low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sorted);
  }, [sortBy, productsInCategory]);

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen pt-0 md:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header + Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white p-4 rounded-xl shadow-md border border-gray-100">
          <nav className="text-sm text-gray-600 mb-4 sm:mb-0">
            <Link to="/" className="hover:underline text-green-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-gray-800">
              {displayCategoryName}
            </span>
          </nav>

          <div className="flex items-center space-x-2 text-gray-700 font-medium">
            <span>Sort By:</span>
            <select
              className="ml-2 border border-gray-300 rounded-lg py-2 px-3 focus:ring-green-500 focus:border-green-500 text-sm md:text-base cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <div
              className="loader rounded-full border-8 border-green-200 h-24 w-24 mx-auto"
              style={{ borderTopColor: "#10B981" }}
            ></div>
            <p className="text-xl text-gray-600 font-semibold mt-4">
              Loading products...
            </p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
                removeItem={removeItem}
                cartItems={cartItems}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl shadow-md p-8">
            <p className="text-2xl font-bold text-gray-700 mb-4">
              Oops! No products found.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              "{displayCategoryName}" category mein abhi products nahi hain.
            </p>
            <Link
              to="/"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 font-semibold"
            >
              Explore Other Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
