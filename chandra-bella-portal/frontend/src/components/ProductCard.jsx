import { useState } from 'react'
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
        <Star key={i} size={14} className="star-filled" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={14} className="star-filled" />
      )
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={14} className="star-empty" />
      )
    }

    return stars
  }

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image-container">
        <div className="product-image-placeholder">
          {product.name}
        </div>
        
        {/* Overlay Actions */}
        <div className="product-overlay">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onViewDetails(product)
            }}
            className="product-overlay-btn product-overlay-btn--view"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="product-overlay-btn product-overlay-btn--cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Category Badge */}
        <div className="product-category-badge">
          <span className="badge badge--category">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="rating-text">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="product-price">
          {product.price}
        </div>

        {/* Description */}
        <p className="product-description">
          {product.description}
        </p>

        {/* Actions */}
        <div className="product-actions">
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`btn btn--primary btn--sm product-add-btn ${
              isInCart(product.id) ? 'btn--secondary' : ''
            }`}
          >
            {isLoading ? (
              <div className="loading-spinner-small" />
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

      <style>{`
        .product-card {
          background: var(--color-background);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-base);
          cursor: pointer;
          border: 1px solid var(--brand-light-purple);
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-accent);
        }

        .product-image-container {
          position: relative;
          overflow: hidden;
        }

        .product-image-placeholder {
          aspect-ratio: 1;
          background: var(--brand-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand-white);
          font-weight: var(--font-weight-medium);
          font-size: 1.125rem;
        }

        .product-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          transition: all var(--transition-base);
        }

        .product-card:hover .product-overlay {
          background: rgba(0, 0, 0, 0.3);
        }

        .product-overlay-btn {
          opacity: 0;
          transform: translateY(16px);
          transition: all var(--transition-base);
          background: var(--brand-white);
          color: var(--brand-primary);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .product-card:hover .product-overlay-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .product-overlay-btn--cart {
          background: var(--brand-primary);
          color: var(--brand-white);
        }

        .product-overlay-btn--cart:hover {
          background: var(--brand-dark);
        }

        .product-overlay-btn--view:hover {
          background: var(--brand-primary);
          color: var(--brand-white);
        }

        .product-overlay-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .product-category-badge {
          position: absolute;
          top: var(--space-2);
          left: var(--space-2);
        }

        .badge {
          background: var(--brand-primary);
          color: var(--brand-white);
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-full);
          text-transform: capitalize;
        }

        .product-info {
          padding: var(--space-4);
        }

        .product-title {
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          margin-bottom: var(--space-2);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          margin-bottom: var(--space-2);
        }

        .stars {
          display: flex;
        }

        .star-filled {
          color: #FFD700;
          fill: #FFD700;
        }

        .star-empty {
          color: #E0E0E0;
        }

        .rating-text {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }

        .product-price {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--brand-primary);
          margin-bottom: var(--space-3);
        }

        .product-description {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: var(--space-4);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-actions {
          display: flex;
          gap: var(--space-2);
        }

        .product-add-btn {
          flex: 1;
        }

        .loading-spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default ProductCard