import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash } from 'react-icons/fa';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    mrp: '',
    image: '',
    category: '',
    unit: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [addingCategory, setAddingCategory] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddVariant = () => {
    setVariants([...variants, { quantity: '', price: '' }]);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleRemoveVariant = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  const autoCalculatePrice = (quantity) => {
    const basePrice = parseFloat(formData.price);
    const baseUnit = formData.unit.replace(/[^\d.]/g, '');
    const quantityVal = parseFloat(quantity.replace(/[^\d.]/g, ''));

    if (basePrice && baseUnit && quantityVal) {
      const unitRatio = quantityVal / baseUnit;
      return (basePrice * unitRatio).toFixed(2);
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalVariants = variants.map(variant => ({
      quantity: variant.quantity,
      price: variant.price || autoCalculatePrice(variant.quantity)
    }));

    const payload = {
      ...formData,
      variants: finalVariants
    };

    try {
      await axios.post('http://localhost:5000/api/products', payload);
      alert('✅ Product Added Successfully!');
      setFormData({ name: '', price: '', mrp: '', image: '', category: '', unit: '' });
      setImagePreview(null);
      setVariants([]);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to Add Product');
    } finally {
      setLoading(false);
    }
  };

  const slugify = (str) => {
    return str.toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleAddNewCategory = async () => {
    if (!newCategory.trim() || !categoryImage) {
      alert('Please enter category name and select image');
      return;
    }
    setAddingCategory(true);

    try {
      const payload = {
        name: newCategory,
        image: categoryImage,
        route: slugify(newCategory)
      };
      await axios.post('http://localhost:5000/api/categories', payload);
      alert('✅ Category Added!');
      setNewCategory('');
      setCategoryImage(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to Add Category');
    } finally {
      setAddingCategory(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
          </div>

          {/* MRP Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">MRP Price (₹)</label>
            <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
          </div>

          {/* Offer Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Offer Price (₹)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
          </div>

          {/* Base Unit */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Base Unit (e.g., 1kg, 500ml)</label>
            <input type="text" name="unit" value={formData.unit} onChange={handleChange} required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.route}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Add New Category */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Add New Category</h3>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleCategoryImageChange}
              className="w-full border rounded-lg px-4 py-2 mb-2 bg-white"
            />
            <button type="button" onClick={handleAddNewCategory}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
              disabled={addingCategory}
            >
              {addingCategory ? 'Adding...' : 'Add Category'}
            </button>
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required
              className="w-full border rounded-lg px-4 py-2 bg-white" />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-3 h-32 object-contain mx-auto border rounded-md shadow" />
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-105 active:scale-95">
            {loading ? 'Adding...' : 'Add Product'}
          </button>

        </form>
      </div>
    </section>
  );
};

export default AddProduct;
