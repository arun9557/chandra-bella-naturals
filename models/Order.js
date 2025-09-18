const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  quantity: {
    type: Number,
    required: [true, 'Please add a quantity'],
    min: [1, 'Quantity must be at least 1']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be a positive number']
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Please add a product ID']
  }
});

const shippingAddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Please add an address'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'Please add a city'],
    trim: true
  },
  postalCode: {
    type: String,
    required: [true, 'Please add a postal code'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Please add a country'],
    trim: true
  }
});

const paymentResultSchema = new mongoose.Schema({
  id: { type: String },
  status: { type: String },
  update_time: { type: String },
  email_address: { type: String }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please add a user ID']
    },
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
      type: String,
      required: [true, 'Please add a payment method'],
      enum: {
        values: ['credit_card', 'paypal', 'stripe', 'bank_transfer'],
        message: 'Payment method is either: credit_card, paypal, stripe, or bank_transfer'
      }
    },
    paymentResult: paymentResultSchema,
    itemsPrice: {
      type: Number,
      required: [true, 'Please add items price'],
      default: 0.0
    },
    taxPrice: {
      type: Number,
      required: [true, 'Please add tax price'],
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      required: [true, 'Please add shipping price'],
      default: 0.0
    },
    totalPrice: {
      type: Number,
      required: [true, 'Please add total price'],
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
    paidAt: {
      type: Date
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false
    },
    deliveredAt: {
      type: Date
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
        message: 'Status is either: pending, processing, shipped, delivered, cancelled, or refunded'
      },
      default: 'pending'
    },
    trackingNumber: {
      type: String,
      trim: true
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot be more than 500 characters']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Prevent user from having multiple unpaid orders with the same items
orderSchema.index({ user: 1, isPaid: 1 });

// Calculate total price before saving
orderSchema.pre('save', async function(next) {
  if (this.isModified('itemsPrice') || this.isModified('shippingPrice') || this.isModified('taxPrice')) {
    this.totalPrice = Number((this.itemsPrice + this.shippingPrice + this.taxPrice).toFixed(2));
  }
  next();
});

// Update product sold count when order is paid
orderSchema.post('save', async function(doc) {
  if (doc.isPaid && doc.isModified('isPaid')) {
    const bulkOps = doc.orderItems.map(item => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { sold: item.quantity } }
      }
    }));
    
    if (bulkOps.length > 0) {
      await mongoose.model('Product').bulkWrite(bulkOps);
    }
  }
});

// Static method to get monthly sales
orderSchema.statics.getMonthlySales = async function() {
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);

  const monthlySales = await this.aggregate([
    {
      $match: {
        isPaid: true,
        createdAt: { $gte: lastYear }
      }
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        totalSales: { $sum: '$totalPrice' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  return monthlySales;
};

// Static method to get top selling products
orderSchema.statics.getTopSellingProducts = async function(limit = 5) {
  const topProducts = await this.aggregate([
    {
      $match: {
        isPaid: true
      }
    },
    {
      $unwind: '$orderItems'
    },
    {
      $group: {
        _id: '$orderItems.product',
        name: { $first: '$orderItems.name' },
        image: { $first: '$orderItems.image' },
        totalSold: { $sum: '$orderItems.quantity' },
        totalRevenue: {
          $sum: {
            $multiply: ['$orderItems.price', '$orderItems.quantity']
          }
        }
      }
    },
    {
      $sort: { totalSold: -1 }
    },
    {
      $limit: limit
    }
  ]);

  return topProducts;
};

module.exports = mongoose.model('Order', orderSchema);
