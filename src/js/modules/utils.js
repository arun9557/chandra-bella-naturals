/**
 * Utility Functions Module
 * Common helper functions used throughout the application
 */

/**
 * Show a notification to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, warning, info)
 * @param {number} duration - How long to show the notification (ms)
 */
export function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications of the same type
    const existingNotifications = document.querySelectorAll(`.notification.${type}`);
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Add icon based on type
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
    
    return notification;
}

/**
 * Show loading spinner
 * @param {string} message - Optional loading message
 */
export function showLoader(message = 'Loading...') {
    let loader = document.getElementById('app-loader');
    
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'app-loader';
        loader.className = 'app-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p class="loader-message">${message}</p>
            </div>
        `;
        document.body.appendChild(loader);
    }
    
    loader.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Hide loading spinner
 */
export function hideLoader() {
    const loader = document.getElementById('app-loader');
    if (loader) {
        loader.style.display = 'none';
        document.body.style.overflow = '';
    }
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately
 */
export function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Format currency for display
 * @param {number|string} amount - Amount to format
 * @param {string} currency - Currency symbol
 */
export function formatCurrency(amount, currency = '₹') {
    const numAmount = typeof amount === 'string' 
        ? parseFloat(amount.replace(/[^0-9.]/g, '')) 
        : amount;
    
    return `${currency}${numAmount.toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })}`;
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 */
export function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

/**
 * Generate unique ID
 * @param {string} prefix - Optional prefix
 */
export function generateId(prefix = '') {
    return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 */
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

/**
 * Lazy load images with intersection observer
 * @param {string} selector - CSS selector for images to lazy load
 */
export function initLazyLoading(selector = 'img[data-src]') {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll(selector).forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll(selector).forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
        });
    }
}

/**
 * Smooth scroll to element
 * @param {string|Element} target - Target element or selector
 * @param {number} offset - Offset from top
 */
export function scrollToElement(target, offset = 0) {
    const element = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
    
    if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Get URL parameters
 * @param {string} param - Parameter name
 */
export function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Set URL parameter without page reload
 * @param {string} param - Parameter name
 * @param {string} value - Parameter value
 */
export function setUrlParameter(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
}

/**
 * Local storage helpers with error handling
 */
export const storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },
    
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

/**
 * Analytics helper
 * @param {string} event - Event name
 * @param {Object} data - Event data
 */
export function trackEvent(event, data = {}) {
    // Google Analytics 4
    if (window.gtag) {
        window.gtag('event', event, data);
    }
    
    // Facebook Pixel
    if (window.fbq) {
        window.fbq('track', event, data);
    }
    
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
        console.log('📊 Event tracked:', event, data);
    }
}
