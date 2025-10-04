import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Heart, Recycle, Award } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { productsAPI } from '../services/api'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.getFeatured()
      setFeaturedProducts(response.data)
    } catch (error) {
      console.error('Error loading featured products:', error)
      // Fallback to sample data if API fails
      setFeaturedProducts([
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
          name: 'Matte Liquid Lipstick',
          price: '₹699',
          rating: 4.5,
          reviews: 178,
          description: 'Long-lasting matte lipstick in vibrant shades',
          category: 'lips',
          image: '/assets/products/lipstick.jpg'
        },
        {
          id: 3,
          name: 'Rose & Hibiscus Toner',
          price: '₹499',
          rating: 4.8,
          reviews: 267,
          description: 'Hydrating toner with rose water and hibiscus extract',
          category: 'skincare',
          image: '/assets/products/toner.jpg'
        },
        {
          id: 4,
          name: 'Argan Oil Hair Mask',
          price: '₹649',
          rating: 4.7,
          reviews: 198,
          description: 'Deep conditioning hair mask with pure Moroccan Argan oil',
          category: 'hair',
          image: '/assets/products/hair-mask.jpg'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (product) => {
    setSelectedProduct(product)
    // You can implement a modal or navigate to product detail page
    console.log('View details for:', product)
  }

  const brandValues = [
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'Pure natural ingredients'
    },
    {
      icon: Heart,
      title: 'Cruelty-Free',
      description: 'Never tested on animals'
    },
    {
      icon: Recycle,
      title: 'Sustainable',
      description: 'Eco-friendly packaging'
    },
    {
      icon: Award,
      title: 'Dermatologically Tested',
      description: 'Safe for all skin types'
    }
  ]

  const categories = [
    { name: 'Face', path: '/products?category=face', color: 'from-pink-400 to-rose-500' },
    { name: 'Lips', path: '/products?category=lips', color: 'from-red-400 to-pink-500' },
    { name: 'Skincare', path: '/products?category=skincare', color: 'from-green-400 to-emerald-500' },
    { name: 'Hair', path: '/products?category=hair', color: 'from-yellow-400 to-orange-500' },
    { name: 'Body', path: '/products?category=body', color: 'from-purple-400 to-indigo-500' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-accent)] to-[var(--brand-secondary)] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Discover Pure Natural Beauty
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Premium natural beauty products crafted with love and the finest botanical ingredients
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn btn--lg bg-white text-[var(--brand-primary)] hover:bg-gray-100">
                  Shop Now
                  <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="btn btn--lg btn--outline border-white text-white hover:bg-white hover:text-[var(--brand-primary)]">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="/assets/logo.png" 
                alt="The Chandra Bella Naturals - Natural Beauty Products" 
                className="h-96 w-auto object-contain animate-pulse"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandValues.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--brand-secondary)] rounded-full mb-4 group-hover:bg-[var(--brand-primary)] transition-colors">
                  <value.icon size={32} className="text-[var(--brand-primary)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--brand-primary)] mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--brand-primary)] mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most loved products that our customers can't get enough of
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn btn--primary btn--lg">
              View All Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--brand-primary)] mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect products for every part of your beauty routine
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="group text-center p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-[var(--brand-primary)] transition-all duration-300 hover:shadow-lg"
              >
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform`}>
                  {category.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-[var(--brand-primary)] group-hover:text-[var(--brand-dark)] transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Beautiful with Our Updates
            </h2>
            <p className="text-white/90 mb-8">
              Get exclusive offers, beauty tips, and new product launches delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-[var(--brand-primary)] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
