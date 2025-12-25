const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = () =>
  fetch(`${API_URL}/api/products`).then(res => res.json());

export const getCategories = () =>
  axios.get(`${API_URL}/api/categories`);

export const addProduct = (payload) =>
  axios.post(`${API_URL}/api/products`, payload);

export const addCategory = (payload) =>
  axios.post(`${API_URL}/api/categories`, payload);

export const loginUser = (data) =>
  fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
