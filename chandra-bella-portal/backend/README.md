# The Chandra Bella Naturals - Backend API

Node.js + Express.js backend API for The Chandra Bella Naturals e-commerce platform.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Seed Database (Optional)**
   ```bash
   npm run seed
   ```

## 📁 Project Structure

```
backend/
├── src/
│   ├── models/             # Database models
│   │   ├── Product.js      # Product schema
│   │   ├── Order.js        # Order schema
│   │   └── Contact.js      # Contact schema
│   ├── routes/             # API routes
│   │   ├── products.js     # Product endpoints
│   │   ├── orders.js       # Order endpoints
│   │   ├── contact.js      # Contact endpoints
│   │   ├── categories.js   # Category endpoints
│   │   ├── newsletter.js   # Newsletter endpoints
│   │   └── auth.js         # Authentication endpoints
│   └── utils/              # Utility functions
│       └── seedData.js     # Database seeding
├── server.js               # Main server file
├── package.json
└── README.md
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start with nodemon
npm start            # Start production server
npm run seed         # Seed database with sample data

# Production
npm start            # Start production server
```

## 🔧 Configuration

### Environment Variables (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/chandra-bella-naturals

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📚 API Endpoints

### Products
```
GET    /api/products              # Get all products
GET    /api/products/featured     # Get featured products
GET    /api/products/category/:category # Get by category
GET    /api/products/search       # Search products
GET    /api/products/:id          # Get single product
POST   /api/products              # Create product (Admin)
PUT    /api/products/:id          # Update product (Admin)
DELETE /api/products/:id          # Delete product (Admin)
```

### Orders
```
POST   /api/orders                # Create new order
GET    /api/orders                # Get orders by email
GET    /api/orders/:id            # Get single order
PATCH  /api/orders/:id/status     # Update order status (Admin)
GET    /api/orders/stats/summary  # Get order statistics (Admin)
```

### Contact
```
POST   /api/contact               # Send contact message
GET    /api/contact               # Get all messages (Admin)
GET    /api/contact/:id           # Get single message (Admin)
PATCH  /api/contact/:id/respond   # Respond to message (Admin)
```

### Newsletter
```
POST   /api/newsletter/subscribe     # Subscribe to newsletter
POST   /api/newsletter/unsubscribe   # Unsubscribe
GET    /api/newsletter/subscribers   # Get subscribers (Admin)
POST   /api/newsletter/send          # Send newsletter (Admin)
```

### Authentication
```
POST   /api/auth/login           # User login
POST   /api/auth/register        # User registration
GET    /api/auth/me              # Get current user
POST   /api/auth/logout          # User logout
```

### Health Check
```
GET    /api/health               # API health status
```

## 🗄️ Database Models

### Product Model
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (enum: face, lips, skincare, hair, body),
  images: [String],
  ingredients: [String],
  usage: String (required),
  rating: Number (default: 0),
  reviews: Number (default: 0),
  inStock: Boolean (default: true),
  stockQuantity: Number (default: 0),
  featured: Boolean (default: false),
  tags: [String],
  weight: String,
  dimensions: String,
  expiryDate: Date,
  isActive: Boolean (default: true)
}
```

### Order Model
```javascript
{
  orderNumber: String (unique, auto-generated),
  customer: {
    firstName: String (required),
    lastName: String (required),
    email: String (required),
    phone: String (required)
  },
  shippingAddress: {
    address: String (required),
    city: String (required),
    pincode: String (required),
    state: String,
    country: String (default: India)
  },
  items: [{
    productId: ObjectId,
    name: String,
    price: Number,
    quantity: Number
  }],
  pricing: {
    subtotal: Number (required),
    shipping: Number (required),
    total: Number (required)
  },
  payment: {
    method: String (enum: card, upi, cod),
    status: String (default: pending),
    transactionId: String
  },
  status: String (default: pending),
  trackingNumber: String,
  notes: String
}
```

### Contact Model
```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  subject: String (enum: general, product, order, return, feedback, other),
  message: String (required),
  status: String (default: new),
  priority: String (default: medium),
  assignedTo: String,
  response: String,
  respondedAt: Date,
  isRead: Boolean (default: false)
}
```

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens** for user authentication
- **Password Hashing** with bcrypt
- **Role-based Access** (user, admin)
- **Token Expiration** handling

### Input Validation
- **Express Validator** for request validation
- **Sanitization** of user inputs
- **Type Checking** for all fields
- **Custom Validation** rules

### Security Headers
- **Helmet.js** for security headers
- **CORS** configuration
- **Rate Limiting** on API endpoints
- **Request Size** limiting

## 📧 Email Integration

### SMTP Configuration
- **Nodemailer** for email sending
- **Gmail SMTP** support
- **HTML Email** templates
- **Error Handling** for email failures

### Email Features
- **Contact Form** notifications
- **Newsletter** subscriptions
- **Order Confirmations** (planned)
- **Password Reset** (planned)

## 🚀 Deployment

### Production Setup
1. **Environment Variables**: Set production values
2. **Database**: Use MongoDB Atlas
3. **Email**: Configure SMTP settings
4. **Security**: Update JWT secrets

### Deployment Platforms
- **Heroku** (Recommended)
- **Railway**
- **DigitalOcean**
- **AWS EC2**

### Environment Variables (Production)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your-production-secret
SMTP_USER=your-production-email
SMTP_PASS=your-production-password
```

## 🧪 Testing

### Test Structure
```
src/
├── __tests__/           # Test files
├── models/              # Model tests
├── routes/              # Route tests
└── utils/               # Utility tests
```

### Running Tests
```bash
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

## 📊 Monitoring & Logging

### Logging
- **Morgan** for HTTP request logging
- **Console** logging for errors
- **Error Tracking** with try-catch blocks

### Health Checks
- **Database** connection status
- **API** response time
- **Memory** usage monitoring

## 🔧 Customization

### Adding New Models
1. Create model in `src/models/`
2. Add validation rules
3. Create routes in `src/routes/`
4. Update API documentation

### Adding New Routes
1. Create route file in `src/routes/`
2. Add validation middleware
3. Implement business logic
4. Add error handling
5. Register in `server.js`

### Database Customization
1. Modify schemas in `src/models/`
2. Add indexes for performance
3. Update seed data in `src/utils/`
4. Run migrations if needed

## 🐛 Troubleshooting

### Common Issues
1. **Database Connection**: Check MongoDB URI
2. **Email Sending**: Verify SMTP credentials
3. **CORS Errors**: Check frontend URL configuration
4. **Validation Errors**: Review request data format

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev
```

## 📚 Dependencies

### Core Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin requests
- **helmet** - Security headers
- **morgan** - HTTP logging

### Authentication
- **jsonwebtoken** - JWT tokens
- **bcryptjs** - Password hashing

### Validation & Security
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting

### Email
- **nodemailer** - Email sending

### Development
- **nodemon** - Auto-restart
- **dotenv** - Environment variables

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Add** tests if applicable
5. **Submit** a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**The Chandra Bella Naturals** - Backend API 🚀
