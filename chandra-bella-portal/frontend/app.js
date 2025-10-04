// Product Data
const productData = {
  "brand": {
    "name": "The Chandra Bella Naturals",
    "tagline": "Embrace Your Natural Beauty",
    "mission": "To provide pure, natural beauty products that enhance your inherent radiance while caring for your skin and the environment.",
    "story": "Founded with a passion for natural beauty, The Chandra Bella Naturals believes that true beauty comes from within and is enhanced by pure, natural ingredients. Our carefully curated products are crafted with love, using only the finest botanical extracts and time-tested natural remedies.",
    "values": [
      "100% Natural Ingredients",
      "Cruelty-Free & Vegan",
      "Sustainable Packaging",
      "Ethically Sourced",
      "Dermatologically Tested"
    ]
  },
  "products": {
    "face": [
      {
        "id": 1,
        "name": "Radiant Glow Foundation",
        "price": "₹899",
        "image": "/images/foundation.jpg",
        "rating": 4.8,
        "reviews": 156,
        "description": "Natural coverage foundation with SPF 30 protection",
        "ingredients": ["Jojoba Oil", "Vitamin E", "Zinc Oxide", "Argan Oil"],
        "usage": "Apply with brush or fingers, blend evenly for natural coverage",
        "category": "face"
      },
      {
        "id": 2,
        "name": "Himalayan Clay Face Mask",
        "price": "₹549",
        "image": "/images/face-mask.jpg",
        "rating": 4.9,
        "reviews": 203,
        "description": "Deep cleansing mask with natural Himalayan clay",
        "ingredients": ["Himalayan Pink Clay", "Rose Water", "Aloe Vera", "Tea Tree Oil"],
        "usage": "Apply thin layer, leave for 15 minutes, rinse with warm water",
        "category": "face"
      },
      {
        "id": 3,
        "name": "Vitamin C Brightening Serum",
        "price": "₹1299",
        "image": "/images/vitamin-c-serum.jpg",
        "rating": 4.7,
        "reviews": 89,
        "description": "Brightening serum with 20% Vitamin C for radiant skin",
        "ingredients": ["Vitamin C", "Hyaluronic Acid", "Niacinamide", "Green Tea Extract"],
        "usage": "Apply 2-3 drops on clean face, follow with moisturizer",
        "category": "face"
      }
    ],
    "lips": [
      {
        "id": 4,
        "name": "Organic Tinted Lip Balm",
        "price": "₹299",
        "image": "/images/lip-balm.jpg",
        "rating": 4.6,
        "reviews": 124,
        "description": "Nourishing lip balm with natural tint and SPF protection",
        "ingredients": ["Shea Butter", "Coconut Oil", "Beeswax", "Natural Fruit Extracts"],
        "usage": "Apply generously to lips throughout the day",
        "category": "lips"
      },
      {
        "id": 5,
        "name": "Matte Liquid Lipstick",
        "price": "₹699",
        "image": "/images/liquid-lipstick.jpg",
        "rating": 4.5,
        "reviews": 178,
        "description": "Long-lasting matte lipstick in vibrant shades",
        "ingredients": ["Natural Waxes", "Plant-based Pigments", "Vitamin E", "Jojoba Oil"],
        "usage": "Apply from center of lips outward, allow to dry",
        "category": "lips"
      }
    ],
    "skincare": [
      {
        "id": 6,
        "name": "Rose & Hibiscus Toner",
        "price": "₹499",
        "image": "/images/toner.jpg",
        "rating": 4.8,
        "reviews": 267,
        "description": "Hydrating toner with rose water and hibiscus extract",
        "ingredients": ["Rose Water", "Hibiscus Extract", "Witch Hazel", "Glycerin"],
        "usage": "Apply with cotton pad or spray directly on face after cleansing",
        "category": "skincare"
      },
      {
        "id": 7,
        "name": "Niacinamide + Zinc Serum",
        "price": "₹799",
        "image": "/images/niacinamide-serum.jpg",
        "rating": 4.9,
        "reviews": 145,
        "description": "Pore-minimizing serum for oily and acne-prone skin",
        "ingredients": ["Niacinamide 10%", "Zinc PCA", "Hyaluronic Acid", "Chamomile Extract"],
        "usage": "Apply 2-3 drops to clean skin, morning and evening",
        "category": "skincare"
      }
    ],
    "hair": [
      {
        "id": 8,
        "name": "Argan Oil Hair Mask",
        "price": "₹649",
        "image": "/images/hair-mask.jpg",
        "rating": 4.7,
        "reviews": 198,
        "description": "Deep conditioning hair mask with pure Moroccan Argan oil",
        "ingredients": ["Argan Oil", "Coconut Oil", "Shea Butter", "Keratin Protein"],
        "usage": "Apply to damp hair, leave for 20 minutes, rinse thoroughly",
        "category": "hair"
      },
      {
        "id": 9,
        "name": "Herbal Hair Growth Serum",
        "price": "₹999",
        "image": "/images/hair-serum.jpg",
        "rating": 4.6,
        "reviews": 87,
        "description": "Stimulating hair serum with natural herbs for growth",
        "ingredients": ["Rosemary Oil", "Peppermint Oil", "Biotin", "Saw Palmetto"],
        "usage": "Massage into scalp daily, do not rinse",
        "category": "hair"
      }
    ],
    "body": [
      {
        "id": 10,
        "name": "Lavender Body Butter",
        "price": "₹449",
        "image": "/images/body-butter.jpg",
        "rating": 4.8,
        "reviews": 156,
        "description": "Rich moisturizing body butter with calming lavender",
        "ingredients": ["Shea Butter", "Cocoa Butter", "Lavender Oil", "Vitamin E"],
        "usage": "Massage onto clean, dry skin for deep hydration",
        "category": "body"
      },
      {
        "id": 11,
        "name": "Exfoliating Body Scrub",
        "price": "₹599",
        "image": "/images/body-scrub.jpg",
        "rating": 4.7,
        "reviews": 134,
        "description": "Gentle exfoliating scrub with sea salt and essential oils",
        "ingredients": ["Dead Sea Salt", "Coconut Oil", "Sugar", "Essential Oils"],
        "usage": "Massage onto wet skin in circular motions, rinse well",
        "category": "body"
      }
    ]
  },
  "featured": [
    {
      "id": 1,
      "name": "Radiant Glow Foundation",
      "price": "₹899",
      "image": "/images/foundation.jpg",
      "rating": 4.8,
      "reviews": 156,
      "description": "Natural coverage foundation with SPF 30 protection",
      "ingredients": ["Jojoba Oil", "Vitamin E", "Zinc Oxide", "Argan Oil"],
      "usage": "Apply with brush or fingers, blend evenly for natural coverage",
      "category": "face"
    },
    {
      "id": 5,
      "name": "Matte Liquid Lipstick",
      "price": "₹699",
      "image": "/images/liquid-lipstick.jpg",
      "rating": 4.5,
      "reviews": 178,
      "description": "Long-lasting matte lipstick in vibrant shades",
      "ingredients": ["Natural Waxes", "Plant-based Pigments", "Vitamin E", "Jojoba Oil"],
      "usage": "Apply from center of lips outward, allow to dry",
      "category": "lips"
    },
    {
      "id": 6,
      "name": "Rose & Hibiscus Toner",
      "price": "₹499",
      "image": "/images/toner.jpg",
      "rating": 4.8,
      "reviews": 267,
      "description": "Hydrating toner with rose water and hibiscus extract",
      "ingredients": ["Rose Water", "Hibiscus Extract", "Witch Hazel", "Glycerin"],
      "usage": "Apply with cotton pad or spray directly on face after cleansing",
      "category": "skincare"
    },
    {
      "id": 8,
      "name": "Argan Oil Hair Mask",
      "price": "₹649",
      "image": "/images/hair-mask.jpg",
      "rating": 4.7,
      "reviews": 198,
      "description": "Deep conditioning hair mask with pure Moroccan Argan oil",
      "ingredients": ["Argan Oil", "Coconut Oil", "Shea Butter", "Keratin Protein"],
      "usage": "Apply to damp hair, leave for 20 minutes, rinse thoroughly",
      "category": "hair"
    }
  ]
};

// Global variables
let allProducts = [];
let filteredProducts = [];
let cart = [];
let currentProduct = null;
let currentQuantity = 1;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Show loading state
    showLoadingState();
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        // Flatten all products into a single array
        allProducts = [
            ...productData.products.face,
            ...productData.products.lips,
            ...productData.products.skincare,
            ...productData.products.hair,
            ...productData.products.body
        ];
        
        filteredProducts = [...allProducts];
        
        // Load featured products
        loadFeaturedProducts();
        loadAllProducts();
        
        // Set up event listeners
        setupEventListeners();
        
        // Initialize navigation
        setupNavigation();
        
        // Initialize cart
        updateCartUI();
        
        // Hide loading state
        hideLoadingState();
    }, 500);
}

function showLoadingState() {
    // Add loading overlay if it doesn't exist
    if (!document.getElementById('loading-overlay')) {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading beautiful products...</p>
            </div>
        `;
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(5px);
        `;
        document.body.appendChild(loadingOverlay);
    }
}

function hideLoadingState() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 300);
    }
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const ratingFilter = document.getElementById('rating-filter');
    
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (priceFilter) priceFilter.addEventListener('change', applyFilters);
    if (ratingFilter) ratingFilter.addEventListener('change', applyFilters);
    
    // Newsletter form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
    });
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Checkout form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href').substring(1);
            
            // Remove active class from all nav links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show target page
            showPage(targetPage);
        });
    });
    
    // Category navigation in dropdown
    const categoryLinks = document.querySelectorAll('[data-category]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            showCategory(category);
        });
    });
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Scroll to top of page
        window.scrollTo(0, 0);
    }
}

function showCategory(category) {
    // Set category filter and apply filters
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.value = category;
    }
    
    // Show shop page
    showPage('shop');
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => l.classList.remove('active'));
    const shopLink = document.querySelector('.nav-link[href="#shop"]');
    if (shopLink) {
        shopLink.classList.add('active');
    }
    
    // Apply filters
    applyFilters();
}

function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    container.innerHTML = '';
    
    productData.featured.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

function loadAllProducts() {
    const container = document.getElementById('all-products');
    if (!container) return;
    
    displayProducts(filteredProducts, container);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="placeholder-image">${product.name}</div>
        <div class="product-card-content">
            <h3>${product.name}</h3>
            <div class="product-rating">
                <div class="stars">${generateStars(product.rating)}</div>
                <span>(${product.reviews} reviews)</span>
            </div>
            <div class="product-price">${product.price}</div>
            <p>${product.description}</p>
            <button class="btn btn--primary quick-add-btn" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
    
    // Add event listeners
    card.addEventListener('click', function(e) {
        // Don't open modal if clicking on the button
        if (!e.target.classList.contains('quick-add-btn')) {
            openProductModal(product);
        }
    });
    
    const quickAddBtn = card.querySelector('.quick-add-btn');
    quickAddBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        addToCartQuick(product.id);
    });
    
    return card;
}

function generateStars(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
        starsHTML += '<i class="far fa-star star empty"></i>';
    }
    
    return starsHTML;
}

function displayProducts(products, container) {
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p class="text-center">No products found matching your criteria.</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.ingredients.some(ingredient => 
                ingredient.toLowerCase().includes(searchTerm)
            )
        );
    }
    
    // If we're on the shop page, update the display
    const shopPage = document.getElementById('shop');
    if (shopPage && shopPage.classList.contains('active')) {
        applyFilters();
    } else if (searchTerm !== '') {
        // If searching from home page, go to shop page
        showPage('shop');
        
        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(l => l.classList.remove('active'));
        const shopLink = document.querySelector('.nav-link[href="#shop"]');
        if (shopLink) {
            shopLink.classList.add('active');
        }
        
        applyFilters();
    }
}

function applyFilters() {
    let filtered = [...allProducts];
    
    // Apply search filter if there's a search term
    const searchInput = document.getElementById('search-input');
    if (searchInput && searchInput.value.trim()) {
        const searchTerm = searchInput.value.toLowerCase().trim();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.ingredients.some(ingredient => 
                ingredient.toLowerCase().includes(searchTerm)
            )
        );
    }
    
    // Apply category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter && categoryFilter.value) {
        filtered = filtered.filter(product => product.category === categoryFilter.value);
    }
    
    // Apply price filter
    const priceFilter = document.getElementById('price-filter');
    if (priceFilter && priceFilter.value) {
        const priceRange = priceFilter.value;
        filtered = filtered.filter(product => {
            const price = parseInt(product.price.replace('₹', ''));
            
            switch (priceRange) {
                case '0-500':
                    return price <= 500;
                case '500-800':
                    return price > 500 && price <= 800;
                case '800-1200':
                    return price > 800 && price <= 1200;
                case '1200+':
                    return price > 1200;
                default:
                    return true;
            }
        });
    }
    
    // Apply rating filter
    const ratingFilter = document.getElementById('rating-filter');
    if (ratingFilter && ratingFilter.value) {
        const minRating = parseFloat(ratingFilter.value.replace('+', ''));
        filtered = filtered.filter(product => product.rating >= minRating);
    }
    
    filteredProducts = filtered;
    
    const container = document.getElementById('all-products');
    if (container) {
        displayProducts(filteredProducts, container);
    }
}

function openProductModal(product) {
    currentProduct = product;
    currentQuantity = 1;
    
    const modal = document.getElementById('product-modal');
    const productName = document.getElementById('modal-product-name');
    const productImage = document.getElementById('modal-product-image');
    const productRating = document.getElementById('modal-product-rating');
    const productReviews = document.getElementById('modal-product-reviews');
    const productPrice = document.getElementById('modal-product-price');
    const productDescription = document.getElementById('modal-product-description');
    const productIngredients = document.getElementById('modal-product-ingredients');
    const productUsage = document.getElementById('modal-product-usage');
    const quantityDisplay = document.getElementById('quantity');
    
    if (productName) productName.textContent = product.name;
    if (productImage) productImage.textContent = product.name;
    if (productRating) productRating.innerHTML = generateStars(product.rating);
    if (productReviews) productReviews.textContent = `(${product.reviews} reviews)`;
    if (productPrice) productPrice.textContent = product.price;
    if (productDescription) productDescription.textContent = product.description;
    if (productUsage) productUsage.textContent = product.usage;
    if (quantityDisplay) quantityDisplay.textContent = currentQuantity;
    
    // Populate ingredients list
    if (productIngredients) {
        productIngredients.innerHTML = '';
        product.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            productIngredients.appendChild(li);
        });
    }
    
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('active');
    }
    
    currentProduct = null;
    currentQuantity = 1;
}

function updateQuantity(change) {
    currentQuantity = Math.max(1, currentQuantity + change);
    const quantityDisplay = document.getElementById('quantity');
    if (quantityDisplay) {
        quantityDisplay.textContent = currentQuantity;
    }
}

function addToCart() {
    if (!currentProduct) return;
    
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        existingItem.quantity += currentQuantity;
    } else {
        cart.push({
            ...currentProduct,
            quantity: currentQuantity
        });
    }
    
    updateCartUI();
    closeModal();
    
    // Show success message
    showNotification('Product added to cart!', 'success');
}

function addToCartQuick(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification('Product added to cart!', 'success');
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Update cart items
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
            if (cartTotal) cartTotal.textContent = '₹0';
            return;
        }
        
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemPrice = parseInt(item.price.replace('₹', ''));
            const itemTotal = itemPrice * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image placeholder-image">${item.name}</div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">₹${itemPrice} × ${item.quantity}</div>
                    <div class="cart-item-controls">
                        <button onclick="updateCartQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity(${index}, 1)">+</button>
                        <button onclick="removeFromCart(${index})" style="margin-left: 1rem; color: red;">Remove</button>
                    </div>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        if (cartTotal) {
            cartTotal.textContent = `₹${total}`;
        }
    }
}

function updateCartQuantity(index, change) {
    if (index < 0 || index >= cart.length) return;
    
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCartUI();
}

function removeFromCart(index) {
    if (index < 0 || index >= cart.length) return;
    
    cart.splice(index, 1);
    updateCartUI();
    showNotification('Item removed from cart', 'info');
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Show checkout page
    showPage('checkout');
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => l.classList.remove('active'));
    
    // Load checkout items
    loadCheckoutItems();
    
    // Close cart sidebar
    toggleCart();
}

function loadCheckoutItems() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTotal = document.getElementById('checkout-total');
    
    if (!checkoutItems) return;
    
    checkoutItems.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemPrice = parseInt(item.price.replace('₹', ''));
        const itemTotal = itemPrice * item.quantity;
        subtotal += itemTotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-name">${item.name} × ${item.quantity}</div>
            <div class="order-item-price">₹${itemTotal}</div>
        `;
        
        checkoutItems.appendChild(orderItem);
    });
    
    const shipping = 50;
    const total = subtotal + shipping;
    
    if (checkoutSubtotal) checkoutSubtotal.textContent = `₹${subtotal}`;
    if (checkoutTotal) checkoutTotal.textContent = `₹${total}`;
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const paymentMethod = formData.get('payment');
    
    // Simulate order processing
    showNotification('Processing your order...', 'info');
    
    setTimeout(() => {
        cart = [];
        updateCartUI();
        showPage('home');
        
        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(l => l.classList.remove('active'));
        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
        
        showNotification('Order placed successfully! Thank you for shopping with us.', 'success');
    }, 2000);
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        e.target.reset();
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearFormErrors();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');
    const newsletter = formData.get('newsletter');
    
    let isValid = true;
    
    // Validate name
    if (!name || name.trim().length < 2) {
        showFieldError('name-error', 'Please enter your full name (at least 2 characters)');
        markFieldError('contact-name');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email-error', 'Please enter a valid email address');
        markFieldError('contact-email');
        isValid = false;
    }
    
    // Validate subject
    if (!subject) {
        showFieldError('subject-error', 'Please select a subject');
        markFieldError('contact-subject');
        isValid = false;
    }
    
    // Validate message
    if (!message || message.trim().length < 10) {
        showFieldError('message-error', 'Please enter a message (at least 10 characters)');
        markFieldError('contact-message');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate form submission
        showNotification('Sending your message...', 'info');
        
        setTimeout(() => {
            showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
            e.target.reset();
            clearFormErrors();
            
            // If newsletter signup is checked
            if (newsletter) {
                showNotification('You have been subscribed to our newsletter!', 'success');
            }
        }, 1500);
    } else {
        showNotification('Please correct the errors below and try again.', 'error');
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    
    const errorFields = document.querySelectorAll('.form-control.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });
}

function showFieldError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function markFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#6c757d'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Global functions that can be called from HTML
window.openProductModal = openProductModal;
window.closeModal = closeModal;
window.updateQuantity = updateQuantity;
window.addToCart = addToCart;
window.addToCartQuick = addToCartQuick;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.checkout = checkout;
window.toggleMobileMenu = toggleMobileMenu;
window.scrollToSection = scrollToSection;
window.showCategory = showCategory;
window.showPage = showPage;

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('product-modal');
    if (modal && e.target === modal) {
        closeModal();
    }
});

// Handle escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('product-modal');
        if (modal && modal.classList.contains('active')) {
            closeModal();
        }
        
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar && cartSidebar.classList.contains('active')) {
            toggleCart();
        }
    }
});

// Handle window resize for mobile menu
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const nav = document.querySelector('.main-nav');
        if (nav) {
            nav.style.display = '';
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});