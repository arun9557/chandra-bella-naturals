const mongoose = require('mongoose')
const Product = require('../models/Product')
require('dotenv').config()

const seedProducts = [
  {
    name: 'Radiant Glow Foundation',
    description: 'Natural coverage foundation with SPF 30 protection, perfect for all-day wear',
    price: 899,
    category: 'face',
    images: ['/assets/products/foundation.jpg'],
    ingredients: ['Jojoba Oil', 'Vitamin E', 'Zinc Oxide', 'Argan Oil', 'Aloe Vera'],
    usage: 'Apply with brush or fingers, blend evenly for natural coverage',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    stockQuantity: 50,
    featured: true,
    tags: ['foundation', 'natural', 'spf', 'glow'],
    weight: '30ml'
  },
  {
    name: 'Himalayan Clay Face Mask',
    description: 'Deep cleansing mask with natural Himalayan clay for radiant skin',
    price: 549,
    category: 'face',
    images: ['/assets/products/face-mask.jpg'],
    ingredients: ['Himalayan Pink Clay', 'Rose Water', 'Aloe Vera', 'Tea Tree Oil', 'Vitamin C'],
    usage: 'Apply thin layer, leave for 15 minutes, rinse with warm water',
    rating: 4.9,
    reviews: 203,
    inStock: true,
    stockQuantity: 75,
    featured: true,
    tags: ['mask', 'clay', 'cleansing', 'himalayan'],
    weight: '100g'
  },
  {
    name: 'Vitamin C Brightening Serum',
    description: 'Brightening serum with 20% Vitamin C for radiant, glowing skin',
    price: 1299,
    category: 'face',
    images: ['/assets/products/vitamin-c-serum.jpg'],
    ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Niacinamide', 'Green Tea Extract', 'Jojoba Oil'],
    usage: 'Apply 2-3 drops on clean skin, follow with moisturizer',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    stockQuantity: 30,
    featured: true,
    tags: ['serum', 'vitamin-c', 'brightening', 'anti-aging'],
    weight: '30ml'
  },
  {
    name: 'Organic Tinted Lip Balm',
    description: 'Nourishing lip balm with natural tint and SPF protection',
    price: 299,
    category: 'lips',
    images: ['/assets/products/lip-balm.jpg'],
    ingredients: ['Coconut Oil', 'Shea Butter', 'Beeswax', 'Vitamin E', 'Natural Pigments'],
    usage: 'Apply directly to lips as needed throughout the day',
    rating: 4.6,
    reviews: 124,
    inStock: true,
    stockQuantity: 100,
    featured: false,
    tags: ['lip-balm', 'tinted', 'organic', 'spf'],
    weight: '4g'
  },
  {
    name: 'Matte Liquid Lipstick',
    description: 'Long-lasting matte lipstick in vibrant shades that stay put all day',
    price: 699,
    category: 'lips',
    images: ['/assets/products/liquid-lipstick.jpg'],
    ingredients: ['Natural Pigments', 'Jojoba Oil', 'Vitamin E', 'Sunflower Oil'],
    usage: 'Apply directly to lips, let dry for matte finish',
    rating: 4.5,
    reviews: 178,
    inStock: true,
    stockQuantity: 60,
    featured: true,
    tags: ['lipstick', 'matte', 'liquid', 'long-lasting'],
    weight: '6ml'
  },
  {
    name: 'Rose & Hibiscus Toner',
    description: 'Hydrating toner with rose water and hibiscus extract for balanced skin',
    price: 499,
    category: 'skincare',
    images: ['/assets/products/toner.jpg'],
    ingredients: ['Rose Water', 'Hibiscus Extract', 'Witch Hazel', 'Aloe Vera', 'Glycerin'],
    usage: 'Apply with cotton pad after cleansing, follow with moisturizer',
    rating: 4.8,
    reviews: 267,
    inStock: true,
    stockQuantity: 80,
    featured: true,
    tags: ['toner', 'rose', 'hibiscus', 'hydrating'],
    weight: '200ml'
  },
  {
    name: 'Niacinamide + Zinc Serum',
    description: 'Pore-minimizing serum for oily and acne-prone skin',
    price: 799,
    category: 'skincare',
    images: ['/assets/products/niacinamide-serum.jpg'],
    ingredients: ['Niacinamide', 'Zinc PCA', 'Hyaluronic Acid', 'Green Tea Extract'],
    usage: 'Apply 2-3 drops on clean skin, use morning and evening',
    rating: 4.9,
    reviews: 145,
    inStock: true,
    stockQuantity: 45,
    featured: false,
    tags: ['serum', 'niacinamide', 'zinc', 'pore-minimizing'],
    weight: '30ml'
  },
  {
    name: 'Argan Oil Hair Mask',
    description: 'Deep conditioning hair mask with pure Moroccan Argan oil',
    price: 649,
    category: 'hair',
    images: ['/assets/products/hair-mask.jpg'],
    ingredients: ['Moroccan Argan Oil', 'Coconut Oil', 'Shea Butter', 'Keratin', 'Vitamin E'],
    usage: 'Apply to damp hair, leave for 20-30 minutes, rinse thoroughly',
    rating: 4.7,
    reviews: 198,
    inStock: true,
    stockQuantity: 55,
    featured: true,
    tags: ['hair-mask', 'argan-oil', 'conditioning', 'moroccan'],
    weight: '250ml'
  },
  {
    name: 'Herbal Hair Growth Serum',
    description: 'Stimulating hair serum with natural herbs for stronger, longer hair',
    price: 999,
    category: 'hair',
    images: ['/assets/products/hair-serum.jpg'],
    ingredients: ['Brahmi Extract', 'Amla Oil', 'Bhringraj Oil', 'Coconut Oil', 'Rosemary Oil'],
    usage: 'Apply to scalp, massage gently, leave overnight, wash in morning',
    rating: 4.6,
    reviews: 87,
    inStock: true,
    stockQuantity: 35,
    featured: false,
    tags: ['hair-serum', 'growth', 'herbal', 'strengthening'],
    weight: '50ml'
  },
  {
    name: 'Lavender Body Butter',
    description: 'Rich moisturizing body butter with calming lavender for soft, smooth skin',
    price: 449,
    category: 'body',
    images: ['/assets/products/body-butter.jpg'],
    ingredients: ['Shea Butter', 'Coconut Oil', 'Lavender Essential Oil', 'Vitamin E', 'Glycerin'],
    usage: 'Apply to clean, dry skin, massage until absorbed',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    stockQuantity: 70,
    featured: true,
    tags: ['body-butter', 'lavender', 'moisturizing', 'calming'],
    weight: '200g'
  },
  {
    name: 'Exfoliating Body Scrub',
    description: 'Gentle exfoliating scrub with sea salt and essential oils for smooth skin',
    price: 599,
    category: 'body',
    images: ['/assets/products/body-scrub.jpg'],
    ingredients: ['Sea Salt', 'Coconut Oil', 'Eucalyptus Oil', 'Tea Tree Oil', 'Aloe Vera'],
    usage: 'Apply to wet skin, massage in circular motions, rinse thoroughly',
    rating: 4.7,
    reviews: 134,
    inStock: true,
    stockQuantity: 65,
    featured: false,
    tags: ['body-scrub', 'exfoliating', 'sea-salt', 'smooth'],
    weight: '300g'
  },
  {
    name: 'Sandalwood & Rose Face Cream',
    description: 'Luxurious face cream with sandalwood and rose for nourished, glowing skin',
    price: 899,
    category: 'skincare',
    images: ['/assets/products/face-cream.jpg'],
    ingredients: ['Sandalwood Oil', 'Rose Water', 'Shea Butter', 'Jojoba Oil', 'Vitamin E'],
    usage: 'Apply to clean skin morning and evening, massage gently',
    rating: 4.9,
    reviews: 112,
    inStock: true,
    stockQuantity: 40,
    featured: true,
    tags: ['face-cream', 'sandalwood', 'rose', 'luxurious'],
    weight: '50g'
  }
]

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chandra-bella-naturals')
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}

const seedDatabase = async () => {
  try {
    await connectDB()
    
    // Clear existing products
    await Product.deleteMany({})
    console.log('Cleared existing products')
    
    // Insert seed products
    const products = await Product.insertMany(seedProducts)
    console.log(`Seeded ${products.length} products`)
    
    // Display some statistics
    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ])
    
    console.log('\nProducts by category:')
    categories.forEach(cat => {
      console.log(`- ${cat._id}: ${cat.count} products`)
    })
    
    const featuredCount = await Product.countDocuments({ featured: true })
    console.log(`\nFeatured products: ${featuredCount}`)
    
    console.log('\n✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

// Run if this file is executed directly
if (require.main === module) {
  seedDatabase()
}

module.exports = { seedProducts, seedDatabase }
