import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, removeItem, cartItems } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [price, setPrice] = useState(0);

  const isInCart = cartItems.some(
    (item) =>
      item.id === product?._id &&
      item.unit === (selectedVariant || product?.unit)
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
        setSelectedVariant('');
        setPrice(data.price);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (selectedVariant && product?.variants?.length > 0) {
      const variantObj = product.variants.find(
        (v) => v.quantity === selectedVariant
      );
      if (variantObj) setPrice(variantObj.price);
    } else if (product) {
      setPrice(product.price);
    }
  }, [selectedVariant, product]);

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price,
      image: product.image,
      category: product.category,
      unit: selectedVariant || product.unit,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-emerald-500 h-20 w-20 animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10 text-red-500 text-lg font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-72 object-contain p-4"
          />
        </div>

        <div className="md:ml-8 mt-6 md:mt-0 flex flex-col justify-between w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {product.name}
          </h2>

          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Base Variant:</span> {product.unit}
          </p>

          {product.variants?.length > 0 && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Select Variant
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="">Base Variant ({product.unit})</option>
                {product.variants.map((variant, idx) => (
                  <option key={idx} value={variant.quantity}>
                    {variant.quantity} - ₹{variant.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <p className="text-emerald-700 font-bold text-2xl mb-4">
            ₹{price.toFixed(2)}
          </p>

          {isInCart ? (
            <button
              onClick={() => removeItem(product._id)}
              className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <FaTrash /> Remove from Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <FaShoppingCart /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
