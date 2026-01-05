import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

// 🔥 FIXED: Only TwoQuick backend
const API_URL = "https://twoquick-backend1.onrender.com";

const Products = () => {
  const { addToCart, removeItem, cartItems } = useContext(CartContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🚀 Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        setProducts(data);

        const uniqueCategories = [
          "All",
          ...new Set(data.map((p) => p.category).filter(Boolean)),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🎯 Filter by Category
  useEffect(() => {
    const category = searchParams.get("category") || "All";
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (p) =>
            p.category?.toLowerCase() === category.toLowerCase()
        )
      );
    }
  }, [products, searchParams]);

  const handleCategoryClick = (category) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  // 🔄 Loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-14 h-14 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600 font-medium tracking-wide">
          Fetching fresh products…
        </p>
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-red-50">
        <p className="text-red-700 text-lg font-semibold mb-4">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white min-h-screen pt-4 md:pt-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* 🔘 Premium Category Bar */}
        <div className="sticky top-14 z-30 bg-white/80 backdrop-blur-md py-3 mb-4">
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {categories.map((category) => {
              const active =
                selectedCategory.toLowerCase() === category.toLowerCase();

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`snap-start whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                    ${
                      active
                        ? "bg-emerald-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 🛍 Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              No products found in{" "}
              <span className="text-emerald-600">
                {selectedCategory}
              </span>
            </p>
            <button
              onClick={() => handleCategoryClick("All")}
              className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-10">
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
        )}
      </div>
    </section>
  );
};

export default Products;
