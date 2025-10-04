import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const Cart = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice, 
    clearCart 
  } = useCart()

  const shipping = 50
  const total = getTotalPrice() + shipping

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)]">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-[var(--brand-secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-[var(--brand-primary)]" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--brand-primary)] mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link to="/products" className="btn btn--primary btn--lg">
              Start Shopping
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--brand-primary)] mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-[var(--brand-primary)]">
                    Cart Items
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-accent)] rounded-lg flex items-center justify-center text-white font-medium text-sm">
                          {item.name}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500 capitalize">
                              {item.category}
                            </span>
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-yellow-500">★</span>
                              <span className="text-sm text-gray-600">
                                {item.rating} ({item.reviews})
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price and Quantity */}
                        <div className="text-right">
                          <div className="text-lg font-semibold text-[var(--brand-primary)] mb-2">
                            {item.price}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="mt-2 text-red-600 hover:text-red-800 text-sm flex items-center space-x-1"
                          >
                            <Trash2 size={14} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm flex items-center space-x-1"
                  >
                    <Trash2 size={16} />
                    <span>Clear Cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-[var(--brand-primary)] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">₹{shipping}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-[var(--brand-primary)]">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    className="w-full btn btn--primary btn--lg"
                  >
                    Proceed to Checkout
                    <ArrowRight size={20} />
                  </Link>
                  
                  <Link
                    to="/products"
                    className="w-full btn btn--outline btn--lg"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-[var(--brand-secondary)] rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-[var(--brand-primary)]">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Secure checkout guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
