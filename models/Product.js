const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price must be a positive number']
    },
    salePrice: {
      type: Number,
      min: [0, 'Sale price must be a positive number']
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
        'skincare',
        'haircare',
        'bodycare',
        'fragrance',
        'makeup',
        'wellness'
      ]
    },
    quantity: {
      type: Number,
      required: [true, 'Please add quantity in stock'],
      min: [0, 'Quantity cannot be negative']
    },
    sku: {
      type: String,
      unique: true,
      sparse: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    photo: {
      type: String,
      default: 'no-photo.jpg'
    },
    ingredients: [String],
    benefits: [String],
    howToUse: String,
    isActive: {
      type: Boolean,
      default: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    brand: {
      type: String,
      default: 'Chandra Bella Naturals'
    },
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ['g', 'ml', 'oz']
      }
    },
    tags: [String]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create product slug from the name
ProductSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Cascade delete reviews when a product is deleted
ProductSchema.pre('remove', async function(next) {
  await this.model('Review').deleteMany({ product: this._id });
  next();
});

// Reverse populate with virtuals
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

// Static method to get average rating and save
ProductSchema.statics.getAverageRating = async function(productId) {
  const obj = await this.aggregate([
    {
      $match: { product: productId }
    },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Product').findByIdAndUpdate(productId, {
      rating: obj[0] ? Math.ceil(obj[0].averageRating) : 0
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save or delete of a review
ProductSchema.post('save', function() {
  this.constructor.getAverageRating(this._id);
});

ProductSchema.post('remove', function() {
  this.constructor.getAverageRating(this._id);
});

module.exports = mongoose.model('Product', ProductSchema);
