import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "./ProductCard";
import { API_URL } from "../utils/api";

const FeaturedProducts = () => {
  const { addToCart, removeItem, cartItems } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/featured`);
        if (!res.ok) throw new Error("Failed to fetch featured products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load featured products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Our Bestsellers</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
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
    </section>
  );
};

export default FeaturedProducts;
