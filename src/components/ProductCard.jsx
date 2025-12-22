import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product, addToCart, removeItem, cartItems }) => {
  const isInCart = cartItems.some((item) => item._id === product?._id);

  const discount =
    product?.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 flex flex-col overflow-hidden relative">
      
      {/* ⭐ FEATURED BADGE */}
      {product?.isFeatured && (
        <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow z-10">
          ⭐ Featured
        </span>
      )}

      <Link
        to={`/products/${product?._id}`}
        className="flex-grow flex flex-col"
      >
        {/* IMAGE + DISCOUNT */}
        <div className="relative h-48 sm:h-56 bg-gray-50 flex items-center justify-center p-4">
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
              🔖 {discount}% OFF
            </div>
          )}
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* INFO */}
        <div className="p-4 flex-grow flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 leading-tight line-clamp-2">
            {product?.name}
          </h3>

          <div className="text-sm text-gray-500 mb-1">
            Quantity: <span className="font-medium">{product?.unit}</span>
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xl font-bold text-emerald-600">
              ₹{product?.price?.toFixed(2)}
            </span>
            {product?.mrp && product.mrp > product.price && (
              <span className="text-sm line-through text-gray-400">
                ₹{product.mrp.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* ACTION BUTTON */}
      <div className="p-4 pt-0">
        {isInCart ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeItem(product._id);
            }}
            className="w-full bg-gray-700 text-white py-2.5 rounded-full text-base font-semibold hover:bg-gray-800 transition shadow-md"
          >
            Remove from Cart
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full bg-rose-500 text-white py-2.5 rounded-full text-base font-semibold hover:bg-rose-600 transition flex items-center justify-center gap-2 shadow-md"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
