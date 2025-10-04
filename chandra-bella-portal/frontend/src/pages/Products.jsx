import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, Grid, List } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { productsAPI } from '../services/api'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    priceRange: '',
    rating: ''
  })

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'face', label: 'Face' },
    { value: 'lips', label: 'Lips' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'hair', label: 'Hair' },
    { value: 'body', label: 'Body' }
  ]

  const priceRanges = [
    { value: '', label: 'All Prices' },
    { value: '0-500', label: '₹0 - ₹500' },
    { value: '500-800', label: '₹500 - ₹800' },
    { value: '800-1200', label: '₹800 - ₹1200' },
    { value: '1200+', label: '₹1200+' }
  ]

  const ratings = [
    { value: '', label: 'All Ratings' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' }
  ]

  useEffect(() => {
    loadProducts()
  }, [filters])

  const loadProducts = async () => {
    try {
      setLoading(true)
      let response

      if (filters.search) {
        response = await productsAPI.search(filters.search)
      } else if (filters.category) {
        response = await productsAPI.getByCategory(filters.category)
      } else {
        response = await productsAPI.getAll()
      }

      let filteredProducts = response.data

      // Apply client-side filters
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number)
        filteredProducts = filteredProducts.filter(product => {
          const price = parseFloat(product.price.replace('₹', ''))
          if (max) {
            return price >= min && price <= max
          } else {
            return price >= min
          }
        })
      }

      if (filters.rating) {
        const minRating = parseFloat(filters.rating)
        filteredProducts = filteredProducts.filter(product => product.rating >= minRating)
      }

      setProducts(filteredProducts)
    } catch (error) {
      console.error('Error loading products:', error)
      // Fallback to sample data
      setProducts(getSampleProducts())
    } finally {
      setLoading(false)
    }
  }

  const getSampleProducts = () => {
    return [
      {
        id: 1,
        name: 'Radiant Glow Foundation',
        price: '₹899',
        rating: 4.8,
        reviews: 156,
        description: 'Natural coverage foundation with SPF 30 protection',
        category: 'face',
        image: '/assets/products/foundation.jpg'
      },
      {
        id: 2,
        name: 'Himalayan Clay Face Mask',
        price: '₹549',
        rating: 4.9,
        reviews: 203,
        description: 'Deep cleansing mask with natural Himalayan clay',
        category: 'face',
        image: '/assets/products/face-mask.jpg'
      },
      {
        id: 3,
        name: 'Vitamin C Brightening Serum',
        price: '₹1299',
        rating: 4.7,
        reviews: 89,
        description: 'Brightening serum with 20% Vitamin C for radiant skin',
        category: 'face',
        image: '/assets/products/vitamin-c-serum.jpg'
      },
      {
        id: 4,
        name: 'Organic Tinted Lip Balm',
        price: '₹299',
        rating: 4.6,
        reviews: 124,
        description: 'Nourishing lip balm with natural tint and SPF protection',
        category: 'lips',
        image: '/assets/products/lip-balm.jpg'
      },
      {
        id: 5,
        name: 'Matte Liquid Lipstick',
        price: '₹699',
        rating: 4.5,
        reviews: 178,
        description: 'Long-lasting matte lipstick in vibrant shades',
        category: 'lips',
        image: '/assets/products/liquid-lipstick.jpg'
      },
      {
        id: 6,
        name: 'Rose & Hibiscus Toner',
        price: '₹499',
        rating: 4.8,
        reviews: 267,
        description: 'Hydrating toner with rose water and hibiscus extract',
        category: 'skincare',
        image: '/assets/products/toner.jpg'
      },
      {
        id: 7,
        name: 'Niacinamide + Zinc Serum',
        price: '₹799',
        rating: 4.9,
        reviews: 145,
        description: 'Pore-minimizing serum for oily and acne-prone skin',
        category: 'skincare',
        image: '/assets/products/niacinamide-serum.jpg'
      },
      {
        id: 8,
        name: 'Argan Oil Hair Mask',
        price: '₹649',
        rating: 4.7,
        reviews: 198,
        description: 'Deep conditioning hair mask with pure Moroccan Argan oil',
        category: 'hair',
        image: '/assets/products/hair-mask.jpg'
      },
      {
        id: 9,
        name: 'Herbal Hair Growth Serum',
        price: '₹999',
        rating: 4.6,
        reviews: 87,
        description: 'Stimulating hair serum with natural herbs for growth',
        category: 'hair',
        image: '/assets/products/hair-serum.jpg'
      },
      {
        id: 10,
        name: 'Lavender Body Butter',
        price: '₹449',
        rating: 4.8,
        reviews: 156,
        description: 'Rich moisturizing body butter with calming lavender',
        category: 'body',
        image: '/assets/products/body-butter.jpg'
      },
      {
        id: 11,
        name: 'Exfoliating Body Scrub',
        price: '₹599',
        rating: 4.7,
        reviews: 134,
        description: 'Gentle exfoliating scrub with sea salt and essential oils',
        category: 'body',
        image: '/assets/products/body-scrub.jpg'
      }
    ]
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    // Update URL params
    const newSearchParams = new URLSearchParams()
    if (newFilters.search) newSearchParams.set('search', newFilters.search)
    if (newFilters.category) newSearchParams.set('category', newFilters.category)
    setSearchParams(newSearchParams)
  }

  const handleViewDetails = (product) => {
    // Navigate to product detail page
    window.location.href = `/products/${product.id}`
  }

  const filteredProducts = products.filter(product => {
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.category && product.category !== filters.category) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--brand-primary)] mb-4">
            {filters.category ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Products` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[var(--brand-primary)] mb-4 flex items-center">
                <Filter size={20} className="mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                  />
                  <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                >
                  {ratings.map(rating => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setFilters({ search: '', category: '', priceRange: '', rating: '' })
                  setSearchParams({})
                }}
                className="w-full btn btn--outline btn--sm"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* View Mode Toggle */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[var(--brand-primary)] text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[var(--brand-primary)] text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="spinner" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
