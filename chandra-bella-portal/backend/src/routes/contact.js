const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')
const { body, validationResult } = require('express-validator')
const nodemailer = require('nodemailer')

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

// @route   POST /api/contact
// @desc    Send contact message
// @access  Public
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').isIn(['general', 'product', 'order', 'return', 'feedback', 'other'])
    .withMessage('Invalid subject'),
  body('message').notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
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
    
    const { name, email, phone, subject, message } = req.body
    
    // Save contact message to database
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    })
    
    await contact.save()
    
    // Send email notification (if SMTP is configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = createTransporter()
        
        const mailOptions = {
          from: process.env.SMTP_USER,
          to: process.env.SMTP_USER, // Send to admin
          subject: `New Contact Form Submission - ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><em>This message was sent from The Chandra Bella Naturals contact form.</em></p>
          `
        }
        
        await transporter.sendMail(mailOptions)
        
        // Send confirmation email to customer
        const customerMailOptions = {
          from: process.env.SMTP_USER,
          to: email,
          subject: 'Thank you for contacting The Chandra Bella Naturals',
          html: `
            <h2>Thank you for reaching out!</h2>
            <p>Dear ${name},</p>
            <p>Thank you for contacting The Chandra Bella Naturals. We have received your message and will get back to you within 24 hours.</p>
            <p><strong>Your message:</strong></p>
            <p>${message}</p>
            <hr>
            <p>Best regards,<br>The Chandra Bella Naturals Team</p>
          `
        }
        
        await transporter.sendMail(customerMailOptions)
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Don't fail the request if email fails
      }
    }
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will get back to you within 24 hours.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        status: contact.status
      }
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({
      success: false,
      message: 'Error processing your message. Please try again.',
      error: error.message
    })
  }
})

// @route   GET /api/contact
// @desc    Get all contact messages (Admin only)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    
    let query = {}
    if (status) {
      query.status = status
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
    
    const total = await Contact.countDocuments(query)
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    })
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages',
      error: error.message
    })
  }
})

// @route   GET /api/contact/:id
// @desc    Get single contact message (Admin only)
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      })
    }
    
    // Mark as read
    await contact.markAsRead()
    
    res.json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Error fetching contact message:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching contact message',
      error: error.message
    })
  }
})

// @route   PATCH /api/contact/:id/respond
// @desc    Respond to contact message (Admin only)
// @access  Private
router.patch('/:id/respond', [
  body('response').notEmpty().withMessage('Response is required'),
  body('assignedTo').notEmpty().withMessage('Assigned to is required')
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
    
    const { response, assignedTo } = req.body
    const contact = await Contact.findById(req.params.id)
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      })
    }
    
    await contact.respond(response, assignedTo)
    
    res.json({
      success: true,
      data: contact,
      message: 'Response sent successfully'
    })
  } catch (error) {
    console.error('Error responding to contact message:', error)
    res.status(500).json({
      success: false,
      message: 'Error responding to contact message',
      error: error.message
    })
  }
})

module.exports = router
