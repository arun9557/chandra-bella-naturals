import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth-token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Products API
export const productsAPI = {
  // Get all products
  getAll: (params = {}) => api.get('/products', { params }),
  
  // Get product by ID
  getById: (id) => api.get(`/products/${id}`),
  
  // Get products by category
  getByCategory: (category) => api.get(`/products/category/${category}`),
  
  // Search products
  search: (query) => api.get(`/products/search?q=${encodeURIComponent(query)}`),
  
  // Get featured products
  getFeatured: () => api.get('/products/featured'),
  
  // Get product reviews
  getReviews: (productId) => api.get(`/products/${productId}/reviews`),
  
  // Add product review
  addReview: (productId, reviewData) => api.post(`/products/${productId}/reviews`, reviewData),
}

// Categories API
export const categoriesAPI = {
  // Get all categories
  getAll: () => api.get('/categories'),
  
  // Get category by ID
  getById: (id) => api.get(`/categories/${id}`),
}

// Orders API
export const ordersAPI = {
  // Create new order
  create: (orderData) => api.post('/orders', orderData),
  
  // Get user orders
  getUserOrders: () => api.get('/orders'),
  
  // Get order by ID
  getById: (id) => api.get(`/orders/${id}`),
  
  // Update order status
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
}

// Cart API (for server-side cart persistence)
export const cartAPI = {
  // Get user cart
  get: () => api.get('/cart'),
  
  // Update cart
  update: (cartData) => api.put('/cart', cartData),
  
  // Clear cart
  clear: () => api.delete('/cart'),
}

// Contact API
export const contactAPI = {
  // Send contact message
  sendMessage: (messageData) => api.post('/contact', messageData),
  
  // Subscribe to newsletter
  subscribe: (email) => api.post('/newsletter/subscribe', { email }),
}

// Auth API (for future user authentication)
export const authAPI = {
  // Login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Register
  register: (userData) => api.post('/auth/register', userData),
  
  // Logout
  logout: () => api.post('/auth/logout'),
  
  // Get current user
  getCurrentUser: () => api.get('/auth/me'),
}

export default api
