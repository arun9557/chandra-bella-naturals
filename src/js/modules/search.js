/**
 * Search Module
 * Handles product search functionality with fuzzy matching and filters
 */

import { debounce } from './utils.js';

/**
 * Search class for handling product searches
 */
export class ProductSearch {
    constructor(products) {
        this.products = products;
        this.searchIndex = this.buildSearchIndex();
        this.filters = {
            category: 'all',
            priceRange: { min: 0, max: Infinity },
            rating: 0,
            tags: []
        };
    }

    /**
     * Build search index for faster searching
     */
    buildSearchIndex() {
        return this.products.map(product => ({
            ...product,
            searchText: [
                product.name,
                product.description,
                product.category,
                ...(product.ingredients || []),
                ...(product.tags || [])
            ].join(' ').toLowerCase()
        }));
    }

    /**
     * Search products with fuzzy matching
     * @param {string} query - Search query
     * @param {Object} options - Search options
     */
    search(query, options = {}) {
        const {
            limit = 20,
            sortBy = 'relevance',
            includeFilters = true
        } = options;

        let results = [...this.searchIndex];

        // Apply text search if query exists
        if (query && query.trim()) {
            const searchTerms = query.toLowerCase().trim().split(/\s+/);
            
            results = results.map(product => {
                let score = 0;
                
                // Exact name match gets highest score
                if (product.name.toLowerCase().includes(query.toLowerCase())) {
                    score += 100;
                }
                
                // Description match
                if (product.description.toLowerCase().includes(query.toLowerCase())) {
                    score += 50;
                }
                
                // Individual term matches
                searchTerms.forEach(term => {
                    if (product.searchText.includes(term)) {
                        score += 10;
                    }
                });
                
                // Ingredient/tag matches
                if (product.ingredients) {
                    product.ingredients.forEach(ingredient => {
                        if (ingredient.toLowerCase().includes(query.toLowerCase())) {
                            score += 30;
                        }
                    });
                }
                
                return { ...product, searchScore: score };
            }).filter(product => product.searchScore > 0);
        }

        // Apply filters if enabled
        if (includeFilters) {
            results = this.applyFilters(results);
        }

        // Sort results
        results = this.sortResults(results, sortBy);

        // Limit results
        if (limit > 0) {
            results = results.slice(0, limit);
        }

        return results;
    }

    /**
     * Apply current filters to results
     * @param {Array} results - Search results
     */
    applyFilters(results) {
        return results.filter(product => {
            // Category filter
            if (this.filters.category !== 'all' && product.category !== this.filters.category) {
                return false;
            }

            // Price range filter
            const price = this.extractPrice(product.price);
            if (price < this.filters.priceRange.min || price > this.filters.priceRange.max) {
                return false;
            }

            // Rating filter
            if (product.rating < this.filters.rating) {
                return false;
            }

            // Tags filter
            if (this.filters.tags.length > 0) {
                const productTags = product.tags || [];
                const hasMatchingTag = this.filters.tags.some(tag => 
                    productTags.includes(tag)
                );
                if (!hasMatchingTag) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * Sort search results
     * @param {Array} results - Results to sort
     * @param {string} sortBy - Sort criteria
     */
    sortResults(results, sortBy) {
        switch (sortBy) {
            case 'relevance':
                return results.sort((a, b) => (b.searchScore || 0) - (a.searchScore || 0));
            
            case 'price-low':
                return results.sort((a, b) => this.extractPrice(a.price) - this.extractPrice(b.price));
            
            case 'price-high':
                return results.sort((a, b) => this.extractPrice(b.price) - this.extractPrice(a.price));
            
            case 'rating':
                return results.sort((a, b) => b.rating - a.rating);
            
            case 'reviews':
                return results.sort((a, b) => b.reviews - a.reviews);
            
            case 'name':
                return results.sort((a, b) => a.name.localeCompare(b.name));
            
            default:
                return results;
        }
    }

    /**
     * Extract numeric price from price string
     * @param {string} priceString - Price string like "₹1,299"
     */
    extractPrice(priceString) {
        return parseFloat(priceString.replace(/[^0-9.]/g, '')) || 0;
    }

    /**
     * Set filter
     * @param {string} filterType - Type of filter
     * @param {*} value - Filter value
     */
    setFilter(filterType, value) {
        if (filterType === 'priceRange') {
            this.filters.priceRange = { ...this.filters.priceRange, ...value };
        } else {
            this.filters[filterType] = value;
        }
    }

    /**
     * Clear all filters
     */
    clearFilters() {
        this.filters = {
            category: 'all',
            priceRange: { min: 0, max: Infinity },
            rating: 0,
            tags: []
        };
    }

    /**
     * Get search suggestions based on partial query
     * @param {string} query - Partial search query
     * @param {number} limit - Maximum suggestions
     */
    getSuggestions(query, limit = 5) {
        if (!query || query.length < 2) return [];

        const suggestions = new Set();
        const queryLower = query.toLowerCase();

        // Product names
        this.products.forEach(product => {
            if (product.name.toLowerCase().includes(queryLower)) {
                suggestions.add(product.name);
            }
        });

        // Categories
        this.products.forEach(product => {
            if (product.category.toLowerCase().includes(queryLower)) {
                suggestions.add(product.category);
            }
        });

        // Ingredients
        this.products.forEach(product => {
            if (product.ingredients) {
                product.ingredients.forEach(ingredient => {
                    if (ingredient.toLowerCase().includes(queryLower)) {
                        suggestions.add(ingredient);
                    }
                });
            }
        });

        return Array.from(suggestions).slice(0, limit);
    }

    /**
     * Get popular search terms (mock data - in real app, this would come from analytics)
     */
    getPopularSearches() {
        return [
            'foundation',
            'lipstick',
            'face mask',
            'serum',
            'sunscreen',
            'moisturizer',
            'toner',
            'lip balm'
        ];
    }
}

/**
 * Initialize search functionality
 * @param {Array} products - Product array
 * @param {string} searchInputSelector - Search input CSS selector
 * @param {string} resultsContainerSelector - Results container CSS selector
 */
export function initializeSearch(products, searchInputSelector = '#searchInput', resultsContainerSelector = '#searchResults') {
    const searchInput = document.querySelector(searchInputSelector);
    const resultsContainer = document.querySelector(resultsContainerSelector);
    
    if (!searchInput) return null;

    const productSearch = new ProductSearch(products);
    
    // Debounced search function
    const debouncedSearch = debounce((query) => {
        const results = productSearch.search(query);
        displaySearchResults(results, resultsContainer);
    }, 300);

    // Search input event listener
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        if (query.length >= 2) {
            debouncedSearch(query);
            showSearchSuggestions(productSearch.getSuggestions(query), searchInput);
        } else {
            clearSearchResults(resultsContainer);
            hideSearchSuggestions();
        }
    });

    // Clear search on escape key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            clearSearchResults(resultsContainer);
            hideSearchSuggestions();
        }
    });

    return productSearch;
}

/**
 * Display search results
 * @param {Array} results - Search results
 * @param {Element} container - Results container
 */
function displaySearchResults(results, container) {
    if (!container) return;

    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search terms or filters</p>
            </div>
        `;
        return;
    }

    container.innerHTML = results.map(product => `
        <div class="search-result-item" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="result-image" loading="lazy">
            <div class="result-content">
                <h4 class="result-title">${product.name}</h4>
                <p class="result-description">${product.description}</p>
                <div class="result-meta">
                    <span class="result-price">${product.price}</span>
                    <span class="result-rating">
                        <i class="fas fa-star"></i> ${product.rating}
                    </span>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers for results
    container.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const productId = parseInt(item.dataset.id);
            // Trigger product view (this would be handled by the main app)
            window.dispatchEvent(new CustomEvent('productView', { detail: { productId } }));
        });
    });
}

/**
 * Clear search results
 * @param {Element} container - Results container
 */
function clearSearchResults(container) {
    if (container) {
        container.innerHTML = '';
    }
}

/**
 * Show search suggestions
 * @param {Array} suggestions - Array of suggestions
 * @param {Element} searchInput - Search input element
 */
function showSearchSuggestions(suggestions, searchInput) {
    // Remove existing suggestions
    hideSearchSuggestions();
    
    if (suggestions.length === 0) return;

    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    suggestionsContainer.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item" data-suggestion="${suggestion}">
            <i class="fas fa-search"></i>
            <span>${suggestion}</span>
        </div>
    `).join('');

    // Position suggestions below search input
    const inputRect = searchInput.getBoundingClientRect();
    suggestionsContainer.style.position = 'absolute';
    suggestionsContainer.style.top = `${inputRect.bottom + window.scrollY}px`;
    suggestionsContainer.style.left = `${inputRect.left + window.scrollX}px`;
    suggestionsContainer.style.width = `${inputRect.width}px`;

    document.body.appendChild(suggestionsContainer);

    // Add click handlers for suggestions
    suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            searchInput.value = item.dataset.suggestion;
            searchInput.dispatchEvent(new Event('input'));
            hideSearchSuggestions();
        });
    });
}

/**
 * Hide search suggestions
 */
function hideSearchSuggestions() {
    const existingSuggestions = document.querySelector('.search-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
}

// Export the search class and initialization function
export default ProductSearch;
