import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, ShoppingCart, ArrowLeft, Minus, Plus, CheckCircle } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { productsAPI } from '../services/api'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, getItemQuantity } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.getById(id)
      setProduct(response.data)
    } catch (error) {
      console.error('Error loading product:', error)
      // Fallback to sample data
      setProduct(getSampleProduct())
    } finally {
      setLoading(false)
    }
  }

  const getSampleProduct = () => {
    const sampleProducts = [
      {
        id: 1,
        name: 'Radiant Glow Foundation',
        price: '₹899',
        rating: 4.8,
        reviews: 156,
        description: 'Natural coverage foundation with SPF 30 protection',
        category: 'face',
        ingredients: ['Jojoba Oil', 'Vitamin E', 'Zinc Oxide', 'Argan Oil'],
        usage: 'Apply with brush or fingers, blend evenly for natural coverage',
        images: ['/assets/products/foundation.jpg'],
        inStock: true
      },
      {
        id: 2,
        name: 'Himalayan Clay Face Mask',
        price: '₹549',
        rating: 4.9,
        reviews: 203,
        description: 'Deep cleansing mask with natural Himalayan clay',
        category: 'face',
        ingredients: ['Himalayan Pink Clay', 'Rose Water', 'Aloe Vera', 'Tea Tree Oil'],
        usage: 'Apply thin layer, leave for 15 minutes, rinse with warm water',
        images: ['/assets/products/face-mask.jpg'],
        inStock: true
      }
    ]
    return sampleProducts.find(p => p.id === parseInt(id)) || sampleProducts[0]
  }

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change)
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`${product.name} added to cart!`)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={20} className="fill-yellow-400 text-yellow-400" />
      )
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={20} className="text-gray-300" />
      )
    }

    return stars
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--brand-primary)] mb-4">
            Product Not Found
          </h1>
          <button
            onClick={() => navigate('/products')}
            className="btn btn--primary"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[var(--brand-primary)] hover:text-[var(--brand-dark)] mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-accent)] rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              {product.name}
            </div>
            
            {/* Image Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg border-2 ${
                      selectedImage === index
                        ? 'border-[var(--brand-primary)]'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-accent)] rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      {product.name}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div>
              <span className="inline-block bg-[var(--brand-primary)] text-white text-sm px-3 py-1 rounded-full capitalize">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-[var(--brand-primary)]">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-[var(--brand-primary)]">
              {product.price}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="text-green-600 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 bg-red-500 rounded-full" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 btn btn--primary btn--lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button
                  onClick={() => navigate('/cart')}
                  className="btn btn--outline btn--lg"
                >
                  View Cart ({getItemQuantity(product.id)})
                </button>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[var(--brand-primary)]">
                Key Features
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-gray-600">100% Natural Ingredients</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-gray-600">Cruelty-Free & Vegan</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-gray-600">Dermatologically Tested</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-gray-600">Eco-Friendly Packaging</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--brand-primary)] mb-4">
                  Key Ingredients
                </h3>
                <ul className="space-y-2">
                  {product.ingredients?.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full" />
                      <span className="text-gray-600">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Use */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--brand-primary)] mb-4">
                  How to Use
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.usage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
