import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from './ProductCard';
import API_URL from '../api/api'; // ✅ IMPORT ADDED

const FeaturedProducts = () => {
  const { addToCart, removeItem, cartItems } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/products/featured`); // ✅ UPDATED

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">
        Our Bestsellers
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-emerald-500 h-16 w-16 animate-spin mb-4"></div>
          <p className="text-lg text-gray-700 font-semibold">Loading Products...</p>
          <style>{`
            .loader { border-top-color: #10B981; }
            @keyframes spin { 
              0% { transform: rotate(0deg); } 
              100% { transform: rotate(360deg); } 
            }
          `}</style>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
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
    </section>
  );
};

export default FeaturedProducts;
