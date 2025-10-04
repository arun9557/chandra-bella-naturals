const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { body, validationResult } = require('express-validator')

// @route   GET /api/products
// @desc    Get all products with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, search, limit = 20, page = 1 } = req.query
    
    let query = { isActive: true }
    
    // Apply filters
    if (category) {
      query.category = category
    }
    
    if (featured === 'true') {
      query.featured = true
    }
    
    if (search) {
      query.$text = { $search: search }
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    // Execute query
    let products = Product.find(query)
    
    if (search) {
      products = products.sort({ score: { $meta: 'textScore' } })
    } else {
      products = products.sort({ createdAt: -1 })
    }
    
    products = products.skip(skip).limit(parseInt(limit))
    
    const results = await products.exec()
    const total = await Product.countDocuments(query)
    
    res.json({
      success: true,
      data: results,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    })
  }
})

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.getFeatured()
    res.json({
      success: true,
      data: products
    })
  } catch (error) {
    console.error('Error fetching featured products:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching featured products',
      error: error.message
    })
  }
})

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params
    const products = await Product.getByCategory(category)
    res.json({
      success: true,
      data: products
    })
  } catch (error) {
    console.error('Error fetching products by category:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching products by category',
      error: error.message
    })
  }
})

// @route   GET /api/products/search
// @desc    Search products
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q: query } = req.query
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      })
    }
    
    const products = await Product.search(query)
    res.json({
      success: true,
      data: products
    })
  } catch (error) {
    console.error('Error searching products:', error)
    res.status(500).json({
      success: false,
      message: 'Error searching products',
      error: error.message
    })
  }
})

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }
    
    res.json({
      success: true,
      data: product
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    })
  }
})

// @route   POST /api/products
// @desc    Create new product (Admin only)
// @access  Private
router.post('/', [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').isIn(['face', 'lips', 'skincare', 'hair', 'body']).withMessage('Invalid category'),
  body('ingredients').isArray().withMessage('Ingredients must be an array'),
  body('usage').notEmpty().withMessage('Usage instructions are required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      })
    }
    
    const product = new Product(req.body)
    await product.save()
    
    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    })
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    })
  }
})

// @route   PUT /api/products/:id
// @desc    Update product (Admin only)
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }
    
    res.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    })
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    })
  }
})

// @route   DELETE /api/products/:id
// @desc    Delete product (Admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    })
  }
})

module.exports = router
