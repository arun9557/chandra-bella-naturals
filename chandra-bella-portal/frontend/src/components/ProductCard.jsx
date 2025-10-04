import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Eye } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const ProductCard = ({ product, onViewDetails }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart, isInCart } = useCart()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsLoading(true)
    try {
      addToCart(product, 1)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={14} className="fill-yellow-400 text-yellow-400" />
      )
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={14} className="text-gray-300" />
      )
    }

    return stars
  }

  return (
    <div className="group card hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-accent)] flex items-center justify-center text-white font-medium text-lg">
          {product.name}
        </div>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center space-x-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onViewDetails(product)
            }}
            className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-[var(--brand-primary)] p-2 rounded-full hover:bg-[var(--brand-primary)] hover:text-white"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-[var(--brand-primary)] text-white p-2 rounded-full hover:bg-[var(--brand-dark)] disabled:opacity-50"
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-[var(--brand-primary)] text-white text-xs px-2 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="text-lg font-bold text-[var(--brand-primary)] mb-3">
          {product.price}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`flex-1 btn btn--primary btn--sm ${
              isInCart(product.id) ? 'btn--secondary' : ''
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingCart size={16} />
                {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
              </>
            )}
          </button>
          
          <button
            onClick={() => onViewDetails(product)}
            className="btn btn--outline btn--sm"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard