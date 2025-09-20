/**
 * The Chandra Bella Naturals - Main JavaScript File
 * 
 * This file serves as the entry point for the application's JavaScript.
 * It initializes the application and sets up the main functionality.
 */

// Import modules
import { initializeApp } from './modules/app.js';
import { setupNavigation } from './modules/navigation.js';
import { setupCart } from './modules/cart.js';
import { setupProductGrid } from './modules/products.js';
import { setupContactForm } from './modules/forms.js';

// Import styles
import '../css/main.css';

// Initialize the application
function initApp() {
    console.log('The Chandra Bella Naturals app initialized');
    
    // Add any global initialization code here
    setupEventListeners();
    
    try {
        // Initialize the application
        initializeApp();
        
        // Set up navigation
        setupNavigation();
        
        // Set up shopping cart functionality
        setupCart();
        
        // Set up product grid and filtering
        setupProductGrid();
        
        // Set up contact form handling
        setupContactForm();
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners');
    
    // Add any global event listeners here
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded');
    });
}

// Initialize the app when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export any public API
const App = {
    init: initApp
};

export default App;
