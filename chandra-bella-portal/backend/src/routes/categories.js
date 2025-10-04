const express = require('express')
const router = express.Router()

// Categories data
const categories = [
  {
    id: 'face',
    name: 'Face',
    description: 'Foundation, concealer, blush, and other face makeup products',
    image: '/assets/categories/face.jpg',
    productCount: 0
  },
  {
    id: 'lips',
    name: 'Lips',
    description: 'Lipsticks, lip balms, lip glosses, and lip care products',
    image: '/assets/categories/lips.jpg',
    productCount: 0
  },
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Cleansers, toners, serums, moisturizers, and treatments',
    image: '/assets/categories/skincare.jpg',
    productCount: 0
  },
  {
    id: 'hair',
    name: 'Hair',
    description: 'Shampoos, conditioners, hair masks, and styling products',
    image: '/assets/categories/hair.jpg',
    productCount: 0
  },
  {
    id: 'body',
    name: 'Body',
    description: 'Body lotions, scrubs, oils, and bath products',
    image: '/assets/categories/body.jpg',
    productCount: 0
  }
]

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    })
  }
})

// @route   GET /api/categories/:id
// @desc    Get single category by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const category = categories.find(cat => cat.id === req.params.id)
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      })
    }
    
    res.json({
      success: true,
      data: category
    })
  } catch (error) {
    console.error('Error fetching category:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: error.message
    })
  }
})

module.exports = router
