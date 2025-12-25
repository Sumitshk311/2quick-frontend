import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import {
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../utils/api";

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await deleteProduct(id);
    setProducts(products.filter((p) => p._id !== id));
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setFormData(p);
    setVariants(p.variants || []);
  };

  const handleUpdate = async () => {
    await updateProduct(editingId, { ...formData, variants });
    alert("✔ Updated");
    setEditingId(null);
    loadProducts();
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl text-green-700 font-bold text-center mb-6">
        Edit Products
      </h2>

      <table className="w-full border">
        <thead className="bg-green-600 text-white">
          <tr>
            <th>Name</th><th>Price</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border">
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td className="flex gap-3 justify-center">
                <button onClick={() => handleEdit(p)}><FaEdit /></button>
                <button onClick={() => handleDelete(p._id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingId && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <input value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input mb-2" />

            <input value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="input mb-2" />

            {variants.map((v, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={v.quantity}
                  onChange={(e) => {
                    const u = [...variants];
                    u[i].quantity = e.target.value;
                    setVariants(u);
                  }} className="input" />
                <input value={v.price}
                  onChange={(e) => {
                    const u = [...variants];
                    u[i].price = e.target.value;
                    setVariants(u);
                  }} className="input" />
              </div>
            ))}

            <button onClick={() => setVariants([...variants, { quantity: "", price: "" }])}
              className="text-green-700 flex gap-2 mb-4">
              <FaPlus /> Add Variant
            </button>

            <div className="flex gap-3">
              <button onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setEditingId(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded">
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
