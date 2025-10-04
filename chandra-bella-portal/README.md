# The Chandra Bella Naturals - E-commerce Platform

A complete e-commerce solution for natural beauty products, built with React frontend and Node.js backend.

## 🌟 Features

### Frontend (React + Vite)
- **Modern UI/UX** with purple and lavender theme
- **Responsive Design** for all devices
- **Product Catalog** with categories and search
- **Shopping Cart** with persistent storage
- **Checkout Flow** with form validation
- **Product Details** with image gallery
- **Contact Form** with email integration
- **Newsletter Subscription**
- **Mobile-First Design**

### Backend (Node.js + Express)
- **RESTful API** with comprehensive endpoints
- **Product Management** with categories and search
- **Order Processing** with status tracking
- **Contact Form** handling with email notifications
- **Newsletter Management** with subscription handling
- **Authentication** with JWT tokens
- **Data Validation** with express-validator
- **Rate Limiting** for API protection
- **CORS** configuration for frontend integration

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chandra-bella-naturals
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Copy environment example
   cp backend/.env.example backend/.env
   
   # Edit the .env file with your configuration
   nano backend/.env
   ```

5. **Start the Development Servers**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Seed the Database (Optional)**
   ```bash
   cd backend
   npm run seed
   ```

## 📁 Project Structure

```
chandra-bella-naturals/
├── frontend/                 # React frontend
│   ├── public/
│   │   └── assets/          # Images and static files
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── styles/         # CSS files
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   ├── server.js
│   └── package.json
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin requests

## 📚 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search` - Search products
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get orders by email
- `GET /api/orders/:id` - Get single order
- `PATCH /api/orders/:id/status` - Update order status

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (Admin)
- `GET /api/contact/:id` - Get single message (Admin)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe
- `GET /api/newsletter/subscribers` - Get subscribers (Admin)

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

## 🎨 Customization

### Frontend Customization
1. **Colors**: Update CSS variables in `src/styles/global.css`
2. **Components**: Modify components in `src/components/`
3. **Pages**: Update page layouts in `src/pages/`
4. **API**: Change API endpoints in `src/services/api.js`

### Backend Customization
1. **Models**: Add new fields in `src/models/`
2. **Routes**: Create new endpoints in `src/routes/`
3. **Validation**: Update validation rules in route files
4. **Database**: Modify connection settings in `server.js`

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables for API URL

### Backend Deployment (Heroku/Railway)
1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy the backend code
4. Update frontend API URL

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/chandra-bella-naturals
JWT_SECRET=your-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🛡️ Security Features

- **Rate Limiting** on API endpoints
- **Input Validation** on all forms
- **CORS** configuration
- **Helmet** security headers
- **JWT** token authentication
- **Password Hashing** with bcrypt

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
```

### Backend Testing
```bash
cd backend
npm test
```

## 📈 Performance Optimization

- **Code Splitting** with React.lazy
- **Image Optimization** with proper sizing
- **API Caching** with appropriate headers
- **Database Indexing** for faster queries
- **Bundle Optimization** with Vite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: hello@chandrabella.com
- Phone: +91 98765 43210

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Express.js team for the robust backend
- MongoDB team for the flexible database
- All open-source contributors

---

**The Chandra Bella Naturals** - Embrace Your Natural Beauty ✨
