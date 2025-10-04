import axios from 'axios'

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API Service Functions
export const productService = {
  // Get all products
  getAllProducts: () => api.get('/products'),
  
  // Get product by ID
  getProductById: (id) => api.get(`/products/${id}`),
  
  // Search products
  searchProducts: (query) => api.get(`/products/search?q=${query}`),
  
  // Get products by category
  getProductsByCategory: (category) => api.get(`/products/category/${category}`),
  
  // Get featured products
  getFeaturedProducts: () => api.get('/products/featured'),
  
  // Filter products
  filterProducts: (filters) => api.post('/products/filter', filters),
}

export const cartService = {
  // Get user's cart
  getCart: () => api.get('/cart'),
  
  // Add item to cart
  addToCart: (productId, quantity) => api.post('/cart/add', { productId, quantity }),
  
  // Update cart item quantity
  updateCartItem: (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity }),
  
  // Remove item from cart
  removeFromCart: (itemId) => api.delete(`/cart/items/${itemId}`),
  
  // Clear cart
  clearCart: () => api.delete('/cart'),
}

export const orderService = {
  // Create order
  createOrder: (orderData) => api.post('/orders', orderData),
  
  // Get user's orders
  getOrders: () => api.get('/orders'),
  
  // Get order by ID
  getOrderById: (id) => api.get(`/orders/${id}`),
  
  // Update order status
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
}

export const userService = {
  // User authentication
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  
  // User profile
  getProfile: () => api.get('/user/profile'),
  updateProfile: (userData) => api.put('/user/profile', userData),
  
  // Password management
  changePassword: (passwordData) => api.put('/user/password', passwordData),
  resetPassword: (email) => api.post('/user/reset-password', { email }),
}

export const contactService = {
  // Submit contact form
  submitContactForm: (formData) => api.post('/contact', formData),
  
  // Subscribe to newsletter
  subscribeNewsletter: (email) => api.post('/newsletter/subscribe', { email }),
}

export default api