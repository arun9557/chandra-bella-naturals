import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { getProductById } from '../data/productData'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, isInCart } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      const productData = getProductById(id)
      
      if (!productData) {
        navigate('/products')
        return
      }
      
      setProduct(productData)
    } catch (error) {
      console.error('Error loading product:', error)
      navigate('/products')
    } finally {
      setLoading(false)
    }
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      toast.success(`${product.name} added to cart!`)
    }
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
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
          <p className="text-gray-600 mb-8">
            The product you&apos;re looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="btn btn--primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center text-[var(--brand-primary)] hover:text-[var(--brand-dark)] transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Products
          </button>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-accent)] rounded-lg flex items-center justify-center text-white font-medium text-2xl">
              {product.name}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index - 1)}
                  className={`aspect-square bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-accent)] rounded-lg flex items-center justify-center text-white font-medium text-sm ${
                    selectedImage === index - 1 ? 'ring-2 ring-[var(--brand-primary)]' : ''
                  }`}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-[var(--brand-primary)] text-white text-xs px-2 py-1 rounded-full capitalize">
                  {product.category}
                </span>
                <span className="text-sm text-gray-500">SKU: {product.id}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-[var(--brand-primary)] mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-[var(--brand-primary)] mb-6">
                {product.price}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--brand-primary)] mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--brand-primary)] mb-3">
                Key Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-[var(--brand-secondary)] text-[var(--brand-primary)] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Usage Instructions */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--brand-primary)] mb-3">
                How to Use
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.usage}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-6">
              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-3 min-w-[3rem] text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Max 10 per order
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 btn btn--primary btn--lg ${
                    isInCart(product.id) ? 'btn--secondary' : ''
                  }`}
                >
                  <ShoppingCart size={20} />
                  {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                </button>

                <button
                  onClick={handleWishlist}
                  className={`btn btn--outline btn--lg ${
                    isWishlisted ? 'text-red-600 border-red-600' : ''
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                </button>

                <button
                  onClick={handleShare}
                  className="btn btn--outline btn--lg"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="bg-[var(--brand-secondary)] p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[var(--brand-primary)] mb-4">
                Why Choose This Product?
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full"></div>
                  <span>100% Natural Ingredients</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full"></div>
                  <span>Cruelty-Free & Vegan</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full"></div>
                  <span>Dermatologically Tested</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full"></div>
                  <span>Free Shipping on Orders Above ₹500</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[var(--brand-primary)] mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would typically show related products */}
            <div className="text-center py-8 text-gray-500">
              Related products would be displayed here
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail