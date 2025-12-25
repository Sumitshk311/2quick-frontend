import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../utils/api";

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [edited, setEdited] = useState({});

  const fetchProducts = async () => {
    const res = await axios.get(`${API_URL}/api/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const saveProduct = async () => {
    await axios.put(`${API_URL}/api/products/${editingId}`, edited);
    setEditingId(null);
    fetchProducts();
  };

  const toggleFeatured = async (id) => {
    await axios.patch(`${API_URL}/api/products/toggle-featured/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Product Manager</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded-lg shadow">
            <img src={p.image} className="h-32 mx-auto object-contain" />
            <h3 className="font-semibold mt-2">{p.name}</h3>
            <p>₹{p.price}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  setEditingId(p._id);
                  setEdited(p);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => toggleFeatured(p._id)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                {p.featured ? "Unfeature" : "Feature"}
              </button>
            </div>

            {editingId === p._id && (
              <div className="mt-3 space-y-2">
                <input
                  className="border p-2 w-full"
                  value={edited.name}
                  onChange={(e) =>
                    setEdited({ ...edited, name: e.target.value })
                  }
                />
                <button
                  onClick={saveProduct}
                  className="bg-emerald-600 text-white w-full py-2 rounded"
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
