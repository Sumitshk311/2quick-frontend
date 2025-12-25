import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api/api";

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setEditedProduct(product);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${API_URL}/api/products/${editingProductId}`,
        editedProduct
      );
      setEditingProductId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const toggleFeatured = async (id) => {
    try {
      await axios.patch(
        `${API_URL}/api/products/toggle-featured/${id}`
      );
      fetchProducts();
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Product Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-md border"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-32 w-full object-contain mb-2"
            />

            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">Price: ₹{product.price}</p>
            <p className="text-gray-600">MRP: ₹{product.mrp}</p>
            <p className="text-gray-600">Unit: {product.unit}</p>

            {product.featured && (
              <span className="inline-block mt-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
                Featured
              </span>
            )}

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => toggleFeatured(product._id)}
                className="flex-1 bg-yellow-400 text-black px-3 py-2 rounded hover:bg-yellow-500"
              >
                {product.featured ? "Unfeature" : "Feature"}
              </button>
            </div>

            {editingProductId === product._id && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="number"
                  name="mrp"
                  value={editedProduct.mrp}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="unit"
                  value={editedProduct.unit}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />

                <button
                  onClick={handleSave}
                  className="w-full bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManage;
