import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      alert("❌ Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("🛑 Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("✔ Product deleted successfully");
    } catch (error) {
      alert("❌ Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setFormData(product);
    setImagePreview(product.image);
    setVariants(product.variants || []);
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...formData,
        variants,
        isFeatured: formData.isFeatured || false,
      };

      await axios.put(
        `http://localhost:5000/api/products/${editingProduct}`,
        updatedData
      );

      alert("✔ Product updated successfully");
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      alert("❌ Update failed");
    }
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { quantity: "", price: "" }]);
  };

  const handleRemoveVariant = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (loading)
    return (
      <p className="text-center py-10 text-lg font-semibold">
        Loading products...
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Edit Products
      </h2>

      {/* TABLE */}
      <div className="overflow-auto rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">MRP</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-100">
                <td className="p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-14 mx-auto object-contain"
                  />
                </td>
                <td className="p-3 font-semibold">{product.name}</td>
                <td className="p-3 text-gray-600">₹{product.mrp}</td>
                <td className="p-3 text-green-700 font-bold">
                  ₹{product.price}
                </td>
                <td className="p-3">{product.category}</td>
                <td className="p-3 text-center">
                  {product.isFeatured ? "⭐ Yes" : "—"}
                </td>
                <td className="p-3 flex gap-3 justify-center">
                  <button
                    className="text-blue-600 hover:text-blue-800 text-xl"
                    onClick={() => handleEdit(product)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 text-xl"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT POPUP */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold text-green-700 text-center mb-4">
              Edit Product
            </h3>

            <input
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Product Name"
              className="w-full mb-3 border rounded-lg px-4 py-2"
            />

            <input
              type="number"
              value={formData.mrp || ""}
              onChange={(e) =>
                setFormData({ ...formData, mrp: e.target.value })
              }
              placeholder="MRP Price"
              className="w-full mb-3 border rounded-lg px-4 py-2"
            />

            <input
              type="number"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Offer Price"
              className="w-full mb-3 border rounded-lg px-4 py-2"
            />

            <input
              value={formData.unit || ""}
              onChange={(e) =>
                setFormData({ ...formData, unit: e.target.value })
              }
              placeholder="Unit (1kg, 500ml)"
              className="w-full mb-3 border rounded-lg px-4 py-2"
            />

            {/* FEATURED CHECKBOX */}
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={formData.isFeatured || false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isFeatured: e.target.checked,
                  })
                }
                className="w-5 h-5 accent-green-600"
              />
              <label className="font-medium text-gray-700">
                Show in Featured Products
              </label>
            </div>

            {/* IMAGE */}
            <label className="block mb-2 font-medium text-gray-600">
              Product Image
            </label>
            <input type="file" onChange={handleImageChange} className="mb-3" />
            {imagePreview && (
              <img src={imagePreview} className="h-32 mx-auto mb-3" />
            )}

            {/* VARIANTS */}
            <h4 className="text-md font-semibold mb-2">
              Quantity & Variant Price
            </h4>

            {variants.map((v, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={v.quantity}
                  placeholder="Quantity"
                  onChange={(e) =>
                    handleVariantChange(i, "quantity", e.target.value)
                  }
                  className="border px-3 py-2 w-1/2 rounded-lg"
                />
                <input
                  value={v.price}
                  placeholder="Price"
                  onChange={(e) =>
                    handleVariantChange(i, "price", e.target.value)
                  }
                  className="border px-3 py-2 w-1/2 rounded-lg"
                />
                <button
                  className="text-red-600"
                  onClick={() => handleRemoveVariant(i)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}

            <button
              onClick={handleAddVariant}
              className="flex items-center gap-2 text-green-700 font-medium mb-4"
            >
              <FaPlus /> Add Variant
            </button>

            <div className="flex gap-3">
              <button
                className="w-full bg-green-600 text-white py-2 rounded-lg"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="w-full bg-gray-400 text-white py-2 rounded-lg"
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProducts;
