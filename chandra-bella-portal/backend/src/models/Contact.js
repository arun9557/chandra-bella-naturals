const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: ['general', 'product', 'order', 'return', 'feedback', 'other']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'in-progress', 'resolved', 'closed']
  },
  priority: {
    type: String,
    default: 'medium',
    enum: ['low', 'medium', 'high', 'urgent']
  },
  assignedTo: {
    type: String,
    trim: true
  },
  response: {
    type: String,
    trim: true
  },
  respondedAt: {
    type: Date
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Index for better query performance
contactSchema.index({ status: 1, createdAt: -1 })
contactSchema.index({ email: 1 })
contactSchema.index({ subject: 1 })

// Method to mark as read
contactSchema.methods.markAsRead = function() {
  this.isRead = true
  return this.save()
}

// Method to respond to inquiry
contactSchema.methods.respond = function(response, assignedTo) {
  this.response = response
  this.assignedTo = assignedTo
  this.respondedAt = new Date()
  this.status = 'resolved'
  return this.save()
}

// Static method to get unread messages
contactSchema.statics.getUnread = function() {
  return this.find({ isRead: false }).sort({ createdAt: -1 })
}

// Static method to get by status
contactSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 })
}

module.exports = mongoose.model('Contact', contactSchema)
