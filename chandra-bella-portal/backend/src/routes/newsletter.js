const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const nodemailer = require('nodemailer')

// In-memory storage for newsletter subscribers (in production, use a database)
const subscribers = new Set()

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/subscribe', [
  body('email').isEmail().withMessage('Valid email is required')
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
    
    const { email } = req.body
    
    // Check if already subscribed
    if (subscribers.has(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email is already subscribed to our newsletter'
      })
    }
    
    // Add to subscribers
    subscribers.add(email)
    
    // Send welcome email (if SMTP is configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = createTransporter()
        
        const mailOptions = {
          from: process.env.SMTP_USER,
          to: email,
          subject: 'Welcome to The Chandra Bella Naturals Newsletter!',
          html: `
            <h2>Welcome to our Beauty Community!</h2>
            <p>Dear Beauty Enthusiast,</p>
            <p>Thank you for subscribing to The Chandra Bella Naturals newsletter! You're now part of our exclusive community of natural beauty lovers.</p>
            <p>You'll receive:</p>
            <ul>
              <li>✨ Exclusive beauty tips and tutorials</li>
              <li>🎁 Special offers and discounts</li>
              <li>🆕 New product launches and updates</li>
              <li>🌿 Natural beauty insights and trends</li>
            </ul>
            <p>We're excited to share our journey of natural beauty with you!</p>
            <hr>
            <p>With love,<br>The Chandra Bella Naturals Team</p>
            <p><small>You can unsubscribe at any time by clicking the unsubscribe link in our emails.</small></p>
          `
        }
        
        await transporter.sendMail(mailOptions)
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError)
        // Don't fail the request if email fails
      }
    }
    
    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: {
        email,
        subscribedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    res.status(500).json({
      success: false,
      message: 'Error subscribing to newsletter',
      error: error.message
    })
  }
})

// @route   POST /api/newsletter/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post('/unsubscribe', [
  body('email').isEmail().withMessage('Valid email is required')
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
    
    const { email } = req.body
    
    // Remove from subscribers
    const wasSubscribed = subscribers.delete(email)
    
    if (!wasSubscribed) {
      return res.status(400).json({
        success: false,
        message: 'Email is not subscribed to our newsletter'
      })
    }
    
    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
      data: {
        email,
        unsubscribedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error)
    res.status(500).json({
      success: false,
      message: 'Error unsubscribing from newsletter',
      error: error.message
    })
  }
})

// @route   GET /api/newsletter/subscribers
// @desc    Get all subscribers (Admin only)
// @access  Private
router.get('/subscribers', async (req, res) => {
  try {
    const subscriberList = Array.from(subscribers).map(email => ({
      email,
      subscribedAt: new Date().toISOString() // In production, store actual subscription date
    }))
    
    res.json({
      success: true,
      data: {
        subscribers: subscriberList,
        total: subscriberList.length
      }
    })
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching subscribers',
      error: error.message
    })
  }
})

// @route   POST /api/newsletter/send
// @desc    Send newsletter to all subscribers (Admin only)
// @access  Private
router.post('/send', [
  body('subject').notEmpty().withMessage('Subject is required'),
  body('content').notEmpty().withMessage('Content is required')
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
    
    const { subject, content } = req.body
    
    if (subscribers.size === 0) {
      return res.status(400).json({
        success: false,
        message: 'No subscribers found'
      })
    }
    
    // Send newsletter to all subscribers (if SMTP is configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = createTransporter()
        
        const subscriberArray = Array.from(subscribers)
        
        for (const email of subscriberArray) {
          const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            html: content
          }
          
          await transporter.sendMail(mailOptions)
        }
        
        res.json({
          success: true,
          message: `Newsletter sent to ${subscriberArray.length} subscribers`,
          data: {
            sentTo: subscriberArray.length,
            subject,
            sentAt: new Date().toISOString()
          }
        })
      } catch (emailError) {
        console.error('Error sending newsletter:', emailError)
        res.status(500).json({
          success: false,
          message: 'Error sending newsletter',
          error: emailError.message
        })
      }
    } else {
      res.status(500).json({
        success: false,
        message: 'Email service not configured'
      })
    }
  } catch (error) {
    console.error('Error sending newsletter:', error)
    res.status(500).json({
      success: false,
      message: 'Error sending newsletter',
      error: error.message
    })
  }
})

module.exports = router
