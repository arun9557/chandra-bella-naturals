import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Smartphone, DollarSign, CheckCircle } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { ordersAPI } from '../services/api'
import toast from 'react-hot-toast'

const Checkout = () => {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card'
  })
  const [errors, setErrors] = useState({})

  const shipping = 50
  const subtotal = getTotalPrice()
  const total = subtotal + shipping

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart')
    }
  }, [items, navigate])

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay with your credit or debit card'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Pay using UPI apps like PhonePe, Google Pay'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: DollarSign,
      description: 'Pay when your order is delivered'
    }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      const orderData = {
        ...formData,
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: parseFloat(item.price.replace('₹', '')),
          quantity: item.quantity
        })),
        subtotal,
        shipping,
        total
      }

      await ordersAPI.create(orderData)
      
      toast.success('Order placed successfully! Thank you for shopping with us.')
      clearCart()
      navigate('/')
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--brand-primary)] mb-2">
              Checkout
            </h1>
            <p className="text-gray-600">
              Complete your order securely
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-[var(--brand-primary)] mb-6">
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your complete address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your city"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] ${
                          errors.pincode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter PIN code"
                      />
                      {errors.pincode && (
                        <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-[var(--brand-primary)] mb-6">
                    Payment Method
                  </h2>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === method.id
                            ? 'border-[var(--brand-primary)] bg-[var(--brand-secondary)]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.paymentMethod === method.id
                              ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]'
                              : 'border-gray-300'
                          }`}>
                            {formData.paymentMethod === method.id && (
                              <CheckCircle size={16} className="text-white" />
                            )}
                          </div>
                          <method.icon size={24} className="text-[var(--brand-primary)]" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {method.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {method.description}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Place Order Button */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn--primary btn--lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing Order...
                      </div>
                    ) : (
                      `Place Order - ₹${total.toFixed(2)}`
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-[var(--brand-primary)] mb-6">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-accent)] rounded-lg flex items-center justify-center text-white text-xs font-medium">
                        {item.name}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-[var(--brand-primary)]">
                        ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">₹{shipping}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                    <span>Total</span>
                    <span className="text-[var(--brand-primary)]">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Info */}
                <div className="mt-6 p-4 bg-[var(--brand-secondary)] rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-[var(--brand-primary)]">
                    <CheckCircle size={16} />
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

export default Checkout
