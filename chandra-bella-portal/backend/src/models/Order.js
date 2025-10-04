const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  }
})

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    }
  },
  shippingAddress: {
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    pincode: {
      type: String,
      required: [true, 'PIN code is required'],
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      default: 'India',
      trim: true
    }
  },
  items: [orderItemSchema],
  pricing: {
    subtotal: {
      type: Number,
      required: true,
      min: [0, 'Subtotal cannot be negative']
    },
    shipping: {
      type: Number,
      required: true,
      min: [0, 'Shipping cannot be negative']
    },
    total: {
      type: Number,
      required: true,
      min: [0, 'Total cannot be negative']
    }
  },
  payment: {
    method: {
      type: String,
      required: true,
      enum: ['card', 'upi', 'cod']
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'completed', 'failed', 'refunded']
    },
    transactionId: {
      type: String,
      trim: true
    }
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
  },
  trackingNumber: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

// Index for better query performance
orderSchema.index({ orderNumber: 1 })
orderSchema.index({ 'customer.email': 1 })
orderSchema.index({ status: 1 })
orderSchema.index({ createdAt: -1 })

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await this.constructor.countDocuments()
    this.orderNumber = `CB${Date.now()}${count.toString().padStart(4, '0')}`
  }
  next()
})

// Virtual for full customer name
orderSchema.virtual('customer.fullName').get(function() {
  return `${this.customer.firstName} ${this.customer.lastName}`
})

// Method to calculate total items
orderSchema.methods.getTotalItems = function() {
  return this.items.reduce((total, item) => total + item.quantity, 0)
}

// Method to update status
orderSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus
  return this.save()
}

// Static method to get orders by email
orderSchema.statics.getByEmail = function(email) {
  return this.find({ 'customer.email': email }).sort({ createdAt: -1 })
}

// Static method to get order statistics
orderSchema.statics.getStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalValue: { $sum: '$pricing.total' }
      }
    }
  ])
}

module.exports = mongoose.model('Order', orderSchema)
