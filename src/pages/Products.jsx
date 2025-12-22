import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { addToCart, removeItem, cartItems } = useContext(CartContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);

        // Extract unique category strings
        const rawCategories = [...new Set(data.map((product) => product.category))].filter(Boolean);
        setCategories(["All", ...rawCategories]);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get("category") || "All";
    setSelectedCategory(categoryParam);

    if (products.length > 0) {
      if (categoryParam === "All") {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(
          products.filter(
            (product) =>
              product.category?.toLowerCase() === categoryParam.toLowerCase()
          )
        );
      }
    } else {
      setFilteredProducts([]);
    }
  }, [products, searchParams]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-emerald-500 h-20 w-20 animate-spin mb-4"></div>
        <p className="text-xl text-gray-700 font-semibold">Loading Products...</p>
        <style>{`
          .loader { border-top-color: #10B981; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-red-50 text-red-700 font-semibold text-center p-4">
        <p className="text-xl">{error}</p>
        <p className="text-lg mt-2">Please check your internet connection or try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-6 sm:py-8 md:pt-20 font-sans text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Category Buttons */}
        <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-3 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`
                flex-shrink-0 whitespace-nowrap
                px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-200
                ${
                  selectedCategory.toLowerCase() === category.toLowerCase()
                    ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-100">
            <p className="text-xl sm:text-2xl text-gray-600 font-semibold">
              No products found in "{selectedCategory}" category.
            </p>
            <button
              onClick={() => handleCategoryClick("All")}
              className="mt-6 inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 pt-5 lg:grid-cols-4 gap-6 sm:gap-8">
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
