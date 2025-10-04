const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['face', 'lips', 'skincare', 'hair', 'body']
  },
  images: [{
    type: String,
    required: true
  }],
  ingredients: [{
    type: String,
    required: true
  }],
  usage: {
    type: String,
    required: [true, 'Usage instructions are required']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviews: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0,
    min: [0, 'Stock quantity cannot be negative']
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  weight: {
    type: String,
    trim: true
  },
  dimensions: {
    type: String,
    trim: true
  },
  expiryDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Index for better query performance
productSchema.index({ category: 1, isActive: 1 })
productSchema.index({ featured: 1, isActive: 1 })
productSchema.index({ name: 'text', description: 'text' })

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return `₹${this.price}`
})

// Method to calculate average rating
productSchema.methods.calculateAverageRating = function() {
  // This would be implemented when we have reviews
  return this.rating
}

// Static method to get featured products
productSchema.statics.getFeatured = function() {
  return this.find({ featured: true, isActive: true, inStock: true })
    .sort({ createdAt: -1 })
    .limit(8)
}

// Static method to get products by category
productSchema.statics.getByCategory = function(category) {
  return this.find({ category, isActive: true, inStock: true })
    .sort({ createdAt: -1 })
}

// Static method to search products
productSchema.statics.search = function(query) {
  return this.find({
    $text: { $search: query },
    isActive: true,
    inStock: true
  }).sort({ score: { $meta: 'textScore' } })
}

module.exports = mongoose.model('Product', productSchema)
