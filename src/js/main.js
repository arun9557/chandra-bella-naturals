/**
 * Main Application Entry Point
 * Chandra Bella Naturals - Natural Beauty E-commerce
 */

// Import modules
import { initializeApp } from './modules/app.js';
import { productData } from './data/products.js';
import { showNotification, showLoader, hideLoader } from './modules/utils.js';

/**
 * Initialize the application with proper error handling and loading states
 */
async function initApplication() {
    try {
        showLoader();
        
        // Initialize the app with product data
        const app = await initializeApp(productData);
        
        // Make app instance available globally if needed
        window.app = app;
        
        hideLoader();
        console.log('✅ Application initialized successfully');
        showNotification('Welcome to Chandra Bella Naturals!', 'success');
        
    } catch (error) {
        hideLoader();
        console.error('❌ Failed to initialize application:', error);
        
        // Show user-friendly error message
        const appElement = document.getElementById('app');
        if (appElement) {
            appElement.innerHTML = `
                <div class="error-container">
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h2>Oops! Something went wrong</h2>
                        <p>We're having trouble loading the application. Please try refreshing the page.</p>
                        <button onclick="window.location.reload()" class="btn btn-primary">
                            <i class="fas fa-refresh"></i> Refresh Page
                        </button>
                    </div>
                </div>
            `;
        }
        
        // Report error for debugging
        if (window.gtag) {
            window.gtag('event', 'exception', {
                description: error.message,
                fatal: true
            });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApplication);

// Handle service worker registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(error => {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}

// Handle navigation
window.addEventListener('hashchange', handleNavigation);

// Initial navigation
handleNavigation();

function handleNavigation() {
    const hash = window.location.hash || '#home';
    const pages = document.querySelectorAll('.page');
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the current page
    const currentPage = document.querySelector(hash);
    if (currentPage) {
        currentPage.classList.add('active');
    } else {
        // If the hash doesn't match any element, show home
        const homePage = document.querySelector('#home');
        if (homePage) homePage.classList.add('active');
    }
    
    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Global functions
window.toggleMobileMenu = function() {
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.classList.toggle('active');
    }
};

window.toggleCart = function() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
    }
};

// Close cart when clicking outside
window.onclick = function(event) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartBtn = document.querySelector('.cart-btn');
    
    if (cartSidebar && cartSidebar.classList.contains('active') && 
        !event.target.closest('.cart-sidebar') && 
        !event.target.closest('.cart-btn')) {
        cartSidebar.classList.remove('active');
    }
};

// Handle checkout
window.checkout = function() {
    // Implement checkout logic here
    console.log('Proceeding to checkout');
    showNotification('Redirecting to checkout...', 'info');
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

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
