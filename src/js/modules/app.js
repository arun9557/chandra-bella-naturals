/**
 * App Module
 * Handles the main application initialization and setup
 */

export function initializeApp(productData) {
    console.log('Initializing app with product data:', productData);
    
    // Store product data in window for global access if needed
    window.productData = productData;
    
    // Initialize the home page
    initializeHomePage(productData);
    
    // Initialize cart
    initializeCart();
    
    return {
        // Public methods
        getProductById: (id) => {
            for (const category in productData.products) {
                const product = productData.products[category].find(p => p.id === id);
                if (product) return product;
            }
            return null;
        },
        getFeaturedProducts: () => {
            return productData.featured.map(id => {
                for (const category in productData.products) {
                    const product = productData.products[category].find(p => p.id === id);
                    if (product) return product;
                }
                return null;
            }).filter(Boolean);
        }
    };
}

// Initialize the home page
function initializeHomePage(productData) {
    const app = document.getElementById('app');
    if (!app) return;
    
    // Create home page content
    app.innerHTML = `
        <section id="home" class="page active">
            <!-- Hero Section -->
            <div class="hero">
                <div class="container">
                    <h1>${productData.brand.name}</h1>
                    <p>${productData.brand.tagline}</p>
                    <a href="#shop" class="btn btn-primary">Shop Now</a>
                </div>
            </div>
            
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
                    <button class="btn btn-outline active" data-category="all">All</button>
                    <button class="btn btn-outline" data-category="face">Face</button>
                    <button class="btn btn-outline" data-category="lips">Lips</button>
                    <button class="btn btn-outline" data-category="skincare">Skincare</button>
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
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="btn-quick-view" onclick="openProductModal(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-add-to-cart" onclick="addToCartQuick(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span class="review-count">(${product.reviews})</span>
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
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="btn-quick-view" onclick="openProductModal(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-add-to-cart" onclick="addToCartQuick(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span class="review-count">(${product.reviews})</span>
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

// Initialize cart
function initializeCart() {
    // Load cart from localStorage if available
    window.cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
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
    const product = window.productData.products
        .flatMap(category => category.products)
        .find(p => p.id === productId);
    
    if (product) {
        const existingItem = window.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            window.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(window.cart));
        
        // Update UI
        updateCartCount();
        updateCartSidebar();
        
        // Show notification
        showNotification('Product added to cart!', 'success');
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

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Export the module
export default {
    initialize: initializeApp
};
