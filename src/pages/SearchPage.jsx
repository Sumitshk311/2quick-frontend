import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import API_URL from "../utils/api";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    }
  }, [query, allProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50 p-6 pt-[1px]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 mb-5">
          <FaSearch /> Search Products
        </h1>

        <div className="flex items-center space-x-2 mb-8">
          <input
            type="text"
            placeholder="Search for items like biscuits, pooja items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-5 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : query ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredResults.length > 0 ? (
              filteredResults.map((product) => (
                <Link
                  to={`/products/${product._id}`}
                  key={product._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center group border border-gray-100 hover:-translate-y-1"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-28 h-28 object-contain mb-3 group-hover:scale-105 transition"
                  />
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-emerald-600 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">Weight: {product.unit}</p>
                  <div className="mt-1">
                    <span className="text-emerald-600 font-bold text-lg">
                      ₹{product.price.toFixed(2)}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        ₹{product.mrp.toFixed(2)}
                      </span>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products found for “{query}”.
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10 text-lg">
            Start typing a product name to see suggestions.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
