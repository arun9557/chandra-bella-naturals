const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const { body, validationResult } = require('express-validator')

// @route   POST /api/orders
// @desc    Create new order
// @access  Public
router.post('/', [
  body('customer.firstName').notEmpty().withMessage('First name is required'),
  body('customer.lastName').notEmpty().withMessage('Last name is required'),
  body('customer.email').isEmail().withMessage('Valid email is required'),
  body('customer.phone').notEmpty().withMessage('Phone number is required'),
  body('shippingAddress.address').notEmpty().withMessage('Address is required'),
  body('shippingAddress.city').notEmpty().withMessage('City is required'),
  body('shippingAddress.pincode').notEmpty().withMessage('PIN code is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('pricing.subtotal').isNumeric().withMessage('Subtotal must be a number'),
  body('pricing.shipping').isNumeric().withMessage('Shipping must be a number'),
  body('pricing.total').isNumeric().withMessage('Total must be a number'),
  body('payment.method').isIn(['card', 'upi', 'cod']).withMessage('Invalid payment method')
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
    
    const order = new Order(req.body)
    await order.save()
    
    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully'
    })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    })
  }
})

// @route   GET /api/orders
// @desc    Get orders by email
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { email } = req.query
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }
    
    const orders = await Order.getByEmail(email)
    
    res.json({
      success: true,
      data: orders
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    })
  }
})

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }
    
    res.json({
      success: true,
      data: order
    })
  } catch (error) {
    console.error('Error fetching order:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    })
  }
})

// @route   PATCH /api/orders/:id/status
// @desc    Update order status (Admin only)
// @access  Private
router.patch('/:id/status', [
  body('status').isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Invalid status')
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
    
    const { status } = req.body
    const order = await Order.findById(req.params.id)
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }
    
    order.status = status
    await order.save()
    
    res.json({
      success: true,
      data: order,
      message: 'Order status updated successfully'
    })
  } catch (error) {
    console.error('Error updating order status:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    })
  }
})

// @route   GET /api/orders/stats/summary
// @desc    Get order statistics (Admin only)
// @access  Private
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Order.getStats()
    const totalOrders = await Order.countDocuments()
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$pricing.total' } } }
    ])
    
    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        statusBreakdown: stats
      }
    })
  } catch (error) {
    console.error('Error fetching order stats:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching order statistics',
      error: error.message
    })
  }
})

module.exports = router
