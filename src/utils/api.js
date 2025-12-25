const API_URL = import.meta.env.VITE_API_URL;

export default API_URL;

// Products
export const fetchProducts = () => fetch(`${API_URL}/api/products`).then(res => res.json());
export const fetchFeaturedProducts = () => fetch(`${API_URL}/api/products/featured`).then(res => res.json());
export const addProduct = (payload) => fetch(`${API_URL}/api/products`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
export const updateProduct = (id, payload) =>
  fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
export const toggleFeaturedProduct = (id) =>
  fetch(`${API_URL}/api/products/toggle-featured/${id}`, { method: "PATCH" });

// Categories
export const getCategories = () => fetch(`${API_URL}/api/categories`).then(res => res.json());
export const addCategory = (payload) =>
  fetch(`${API_URL}/api/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

// Auth
export const loginUser = (data) =>
  fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
