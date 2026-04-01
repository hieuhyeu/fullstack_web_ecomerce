import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
};

// Product API
export const productAPI = {
  getAll: (category) => API.get('/products', { params: { category } }),
  getById: (id) => API.get(`/products/${id}`),
  search: (keyword) => API.get('/products/search', { params: { keyword } }),
};

// Cart API
export const cartAPI = {
  get: () => API.get('/cart'),
  add: (data) => API.post('/cart', data),
  update: (id, quantity) => API.put(`/cart/${id}`, { quantity }),
  remove: (id) => API.delete(`/cart/${id}`),
};

// Order API
export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getAll: () => API.get('/orders'),
  getById: (id) => API.get(`/orders/${id}`),
};

export default API;
