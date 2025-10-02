/**
 * App Module
 * Handles the main application initialization and setup
 * Enhanced with search functionality, lazy loading, and better error handling
 */

import { initializeSearch } from './search.js';
import { showNotification, initLazyLoading, storage } from './utils.js';

export async function initializeApp(productData) {
    console.log('🚀 Initializing app with product data:', productData);
    
    // Store product data in window for global access if needed
    window.productData = productData;
    
    try {
        // Initialize the home page
        await initializeHomePage(productData);
        
        // Initialize cart
        initializeCart();
        
        // Initialize search functionality
        const allProducts = getAllProductsFlat(productData);
        const searchInstance = initializeSearch(allProducts, '#headerSearchInput', '#headerSearchResults');
        
        // Initialize lazy loading for images
        initLazyLoading();
        
        // Setup performance monitoring
        setupPerformanceMonitoring();
        
        console.log('✅ App initialization completed successfully');
        
        return {
            // Public methods
            getProductById: (id) => getProductById(productData, id),
            getFeaturedProducts: () => getFeaturedProducts(productData),
            getAllProducts: () => getAllProductsFlat(productData),
            search: searchInstance,
            // Analytics methods
            trackEvent: (event, data) => {
                if (window.gtag) window.gtag('event', event, data);
                console.log('📊 Event:', event, data);
            }
        };
    } catch (error) {
        console.error('❌ Error during app initialization:', error);
        throw error;
    }
}

/**
 * Helper function to get all products as a flat array
 */
function getAllProductsFlat(productData) {
    return Object.values(productData.products).flat();
}

/**
 * Helper function to get product by ID
 */
function getProductById(productData, id) {
    for (const category in productData.products) {
        const product = productData.products[category].find(p => p.id === id);
        if (product) return product;
    }
    return null;
}

/**
 * Helper function to get featured products
 */
function getFeaturedProducts(productData) {
    return productData.featured.map(id => getProductById(productData, id)).filter(Boolean);
}

/**
 * Get icon for brand values
 */
function getValueIcon(value) {
    const iconMap = {
        '100% Natural Ingredients': 'leaf',
        'Cruelty-Free & Vegan': 'heart',
        'Sustainable Packaging': 'recycle',
        'Ethically Sourced': 'handshake',
        'Dermatologically Tested': 'shield-alt'
    };
    return iconMap[value] || 'star';
}

/**
 * Setup performance monitoring
 */
function setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // This would integrate with a real performance monitoring service
        console.log('📈 Performance monitoring initialized');
    }
    
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Track performance
        if (window.gtag) {
            window.gtag('event', 'page_load_time', {
                value: Math.round(loadTime)
            });
        }
    });
}

// Initialize the home page
async function initializeHomePage(productData) {
    const app = document.getElementById('app');
    if (!app) return;
    
    // Create home page content
    app.innerHTML = `
        <section id="home" class="page active">
            <!-- Professional Hero Section -->
            <div class="hero-banner">
                <div class="hero-background">
                    <div class="hero-overlay"></div>
                </div>
                <div class="container">
                    <div class="hero-content">
                        <div class="brand-logo">
                            <img src="/Whimsical Purple Beauty Brand Logo with Gray 11.png" alt="Chandra Bella Naturals Logo" class="logo-image">
                        </div>
                        <h1 class="hero-title">${productData.brand.name}</h1>
                        <p class="hero-tagline">${productData.brand.tagline}</p>
                        <p class="hero-description">Discover the power of nature with our premium collection of natural beauty products. Crafted with love, made for you.</p>
                        <div class="hero-actions">
                            <a href="#shop" class="btn btn-primary btn-large">Explore Collection</a>
                            <a href="#about" class="btn btn-outline btn-large">Our Story</a>
                        </div>
                        <div class="hero-features">
                            <div class="feature-item">
                                <i class="fas fa-leaf"></i>
                                <span>100% Natural</span>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-heart"></i>
                                <span>Cruelty Free</span>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-recycle"></i>
                                <span>Sustainable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Brand Values Section -->
            <section class="brand-values">
                <div class="container">
                    <div class="values-grid">
                        ${productData.brand.values.map(value => `
                            <div class="value-card">
                                <div class="value-icon">
                                    <i class="fas fa-${getValueIcon(value)}"></i>
                                </div>
                                <h3>${value}</h3>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
            
            <!-- Featured Products -->
            <section class="products">
                <div class="container">
                    <h2 class="section-title">Featured Products</h2>
                    <div class="product-grid" id="featuredProducts">
                        <!-- Featured products will be inserted here -->
                    </div>
                </div>
            </section>
            
            <!-- About Section -->
            <section class="about-section">
                <div class="container">
                    <h2>Our Story</h2>
                    <p>${productData.brand.story}</p>
                    <a href="#about" class="btn btn-outline">Learn More</a>
                </div>
            </section>
        </section>
        
        <!-- Shop Page -->
        <section id="shop" class="page">
            <div class="container">
                <h1 class="section-title">Our Products</h1>
                <div class="product-filters">
                    <button class="btn btn-outline active" data-category="all">All Products</button>
                    <button class="btn btn-outline" data-category="face">Face</button>
                    <button class="btn btn-outline" data-category="lips">Lips</button>
                    <button class="btn btn-outline" data-category="skincare">Skincare</button>
                    <button class="btn btn-outline" data-category="hair">Hair</button>
                    <button class="btn btn-outline" data-category="body">Body</button>
                </div>
                <div class="product-grid" id="shopProducts">
                    <!-- All products will be inserted here -->
                </div>
            </div>
        </section>
        
        <!-- About Page -->
        <section id="about" class="page">
            <div class="container">
                <h1 class="section-title">About Us</h1>
                <div class="about-content">
                    <div class="about-text">
                        <h2>${productData.brand.name}</h2>
                        <p>${productData.brand.mission}</p>
                        <p>${productData.brand.story}</p>
                        
                        <h3>Our Values</h3>
                        <ul class="values-list">
                            ${productData.brand.values.map(value => `<li>${value}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="about-image">
                        <img src="/images/about.jpg" alt="About ${productData.brand.name}">
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Contact Page -->
        <section id="contact" class="page">
            <div class="container">
                <h1 class="section-title">Contact Us</h1>
                <div class="contact-content">
                    <div class="contact-info">
                        <h3>Get in Touch</h3>
                        <p>Have questions about our products or need assistance? We'd love to hear from you!</p>
                        
                        <div class="contact-details">
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>info@chandrabella.com</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <span>+91 98765 43210</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>123 Beauty Street, Mumbai, India - 400001</span>
                            </div>
                        </div>
                        
                        <div class="social-links">
                            <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-pinterest-p"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    
                    <form class="contact-form" onsubmit="submitContactForm(event)">
                        <div class="form-group">
                            <input type="text" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" placeholder="Your Email" required>
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Subject">
                        </div>
                        <div class="form-group">
                            <textarea placeholder="Your Message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    `;
    
    // Render featured products
    renderFeaturedProducts();
    
    // Render all products in shop
    renderAllProducts();
    
    // Setup event listeners
    setupEventListeners();
}

// Render featured products
function renderFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;
    
    const featuredProducts = window.productData.featured.map(id => {
        for (const category in window.productData.products) {
            const product = window.productData.products[category].find(p => p.id === id);
            if (product) return product;
        }
        return null;
    }).filter(Boolean);
    
    if (featuredProducts.length === 0) {
        featuredContainer.innerHTML = '<p>No featured products available.</p>';
        return;
    }
    
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card fade-in" data-id="${product.id}">
            <div class="product-image">
                <img data-src="${product.image}" 
                     alt="${product.name}" 
                     class="lazy"
                     loading="lazy"
                     src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3C/svg%3E">
                <div class="product-actions">
                    <button class="btn-quick-view" 
                            onclick="openProductModal(${product.id})"
                            aria-label="Quick view ${product.name}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-add-to-cart" 
                            onclick="addToCartQuick(${product.id})"
                            aria-label="Add ${product.name} to cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span class="review-count">(${product.reviews} reviews)</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Render all products in shop
function renderAllProducts() {
    const shopContainer = document.getElementById('shopProducts');
    if (!shopContainer) return;
    
    let allProducts = [];
    for (const category in window.productData.products) {
        allProducts = [...allProducts, ...window.productData.products[category]];
    }
    
    if (allProducts.length === 0) {
        shopContainer.innerHTML = '<p>No products available.</p>';
        return;
    }
    
    shopContainer.innerHTML = allProducts.map(product => `
        <div class="product-card fade-in" data-id="${product.id}" data-category="${product.category}">
            <div class="product-image">
                <img data-src="${product.image}" 
                     alt="${product.name}" 
                     class="lazy"
                     loading="lazy"
                     src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3C/svg%3E">
                <div class="product-actions">
                    <button class="btn-quick-view" 
                            onclick="openProductModal(${product.id})"
                            aria-label="Quick view ${product.name}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-add-to-cart" 
                            onclick="addToCartQuick(${product.id})"
                            aria-label="Add ${product.name} to cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span class="review-count">(${product.reviews} reviews)</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Add full stars
    stars += '<i class="fas fa-star"></i>'.repeat(fullStars);
    
    // Add half star if needed
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    stars += '<i class="far fa-star"></i>'.repeat(emptyStars);
    
    return stars;
}

// Initialize cart with better error handling
function initializeCart() {
    try {
        // Load cart from localStorage if available
        window.cart = storage.get('cart', []);
        updateCartCount();
        updateCartSidebar();
        console.log('🛒 Cart initialized with', window.cart.length, 'items');
    } catch (error) {
        console.error('❌ Error initializing cart:', error);
        window.cart = [];
        showNotification('Error loading cart data', 'error');
    }
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = window.cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Category filter buttons
    const filterButtons = document.querySelectorAll('.product-filters .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            filterProducts(category);
        });
    });
}

// Filter products by category
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Make functions available globally
window.openProductModal = (productId) => {
    // Implement product modal logic here
    console.log('Opening product modal for ID:', productId);
};

window.addToCartQuick = (productId) => {
    try {
        const product = getProductById(window.productData, productId);
        
        if (!product) {
            showNotification('Product not found', 'error');
            return;
        }
        
        const existingItem = window.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
            showNotification(`Updated ${product.name} quantity in cart`, 'success');
        } else {
            window.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
            showNotification(`${product.name} added to cart!`, 'success');
        }
        
        // Save to localStorage with error handling
        if (!storage.set('cart', window.cart)) {
            showNotification('Error saving cart data', 'error');
            return;
        }
        
        // Update UI
        updateCartCount();
        updateCartSidebar();
        
        // Track analytics
        if (window.gtag) {
            window.gtag('event', 'add_to_cart', {
                currency: 'INR',
                value: parseFloat(product.price.replace(/[^0-9.]/g, '')),
                items: [{
                    item_id: product.id,
                    item_name: product.name,
                    category: product.category,
                    quantity: 1,
                    price: parseFloat(product.price.replace(/[^0-9.]/g, ''))
                }]
            });
        }
        
        // Add visual feedback to button
        const button = document.querySelector(`[onclick="addToCartQuick(${productId})"]`);
        if (button) {
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.disabled = false;
            }, 1000);
        }
        
    } catch (error) {
        console.error('❌ Error adding product to cart:', error);
        showNotification('Error adding product to cart', 'error');
    }
};

// Update cart sidebar
function updateCartSidebar() {
    const cartItems = document.querySelector('.cart-items');
    const emptyCart = document.querySelector('.empty-cart-message');
    const cartTotal = document.querySelector('.cart-total .total-amount');
    
    if (window.cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.innerHTML = '';
        cartTotal.textContent = '₹0.00';
        return;
    }
    
    emptyCart.style.display = 'none';
    
    // Calculate total
    let total = 0;
    
    cartItems.innerHTML = window.cart.map(item => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        const itemTotal = price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price} x ${item.quantity}</div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = `₹${total.toFixed(2)}`;
}

// Remove item from cart
window.removeFromCart = (productId) => {
    window.cart = window.cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(window.cart));
    updateCartCount();
    updateCartSidebar();
    showNotification('Product removed from cart', 'info');
};

// Handle contact form submission
window.submitContactForm = (event) => {
    event.preventDefault();
    // Implement form submission logic here
    showNotification('Your message has been sent!', 'success');
    event.target.reset();
};

// Handle newsletter subscription
window.subscribeNewsletter = (event) => {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    // Implement subscription logic here
    showNotification(`Thank you for subscribing with ${email}!`, 'success');
    event.target.reset();
};

// showNotification function is imported from utils.js

// Export the module
export default {
    initialize: initializeApp
};
