import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  getCategories,
  addProduct,
  addCategory,
} from "../utils/api"; // 🔁 path adjust if needed

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    mrp: "",
    image: "",
    category: "",
    unit: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [addingCategory, setAddingCategory] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

  const handleAddVariant = () =>
    setVariants([...variants, { quantity: "", price: "" }]);

  const handleVariantChange = (i, field, value) => {
    const updated = [...variants];
    updated[i][field] = value;
    setVariants(updated);
  };

  const handleRemoveVariant = (i) => {
    const updated = [...variants];
    updated.splice(i, 1);
    setVariants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addProduct({ ...formData, variants });
      alert("✅ Product Added Successfully");
      setFormData({
        name: "",
        price: "",
        mrp: "",
        image: "",
        category: "",
        unit: "",
      });
      setVariants([]);
      setImagePreview(null);
    } catch {
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewCategory = async () => {
    if (!newCategory || !categoryImage) return alert("Fill all fields");
    setAddingCategory(true);

    try {
      await addCategory({
        name: newCategory,
        image: categoryImage,
        route: newCategory.toLowerCase().replace(/\s+/g, "-"),
      });
      alert("✅ Category Added");
      setNewCategory("");
      setCategoryImage(null);
      loadCategories();
    } catch {
      alert("❌ Failed to add category");
    } finally {
      setAddingCategory(false);
    }
  };

  return (
    <section className="min-h-screen bg-green-50 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-green-700">
          Add Product
        </h2>

        <input name="name" placeholder="Product Name" value={formData.name}
          onChange={handleChange} className="input" required />

        <input name="mrp" type="number" placeholder="MRP"
          value={formData.mrp} onChange={handleChange} className="input" required />

        <input name="price" type="number" placeholder="Offer Price"
          value={formData.price} onChange={handleChange} className="input" required />

        <input name="unit" placeholder="Unit (1kg / 500ml)"
          value={formData.unit} onChange={handleChange} className="input" required />

        <select name="category" value={formData.category}
          onChange={handleChange} className="input" required>
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c.route}>{c.name}</option>
          ))}
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} className="h-28 mx-auto" />}

        <div>
          <h4 className="font-semibold mb-1">Variants</h4>
          {variants.map((v, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input placeholder="Qty" value={v.quantity}
                onChange={(e) => handleVariantChange(i, "quantity", e.target.value)}
                className="input" />
              <input placeholder="Price" value={v.price}
                onChange={(e) => handleVariantChange(i, "price", e.target.value)}
                className="input" />
              <button type="button" onClick={() => handleRemoveVariant(i)}>
                <FaTrash className="text-red-500" />
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddVariant}
            className="text-green-700 flex items-center gap-2">
            <FaPlus /> Add Variant
          </button>
        </div>

        <button disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg">
          {loading ? "Adding..." : "Add Product"}
        </button>

        <hr />

        <input placeholder="New Category" value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)} className="input" />
        <input type="file" accept="image/*"
          onChange={(e) => {
            const r = new FileReader();
            r.onloadend = () => setCategoryImage(r.result);
            r.readAsDataURL(e.target.files[0]);
          }} />

        <button type="button" onClick={handleAddNewCategory}
          className="w-full bg-gray-700 text-white py-2 rounded-lg">
          {addingCategory ? "Adding..." : "Add Category"}
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
