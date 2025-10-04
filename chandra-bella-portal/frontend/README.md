# The Chandra Bella Naturals - Frontend

Modern React frontend for The Chandra Bella Naturals e-commerce platform.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
frontend/
├── public/
│   └── assets/              # Static assets (images, logos)
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.jsx      # Main layout wrapper
│   │   ├── Navbar.jsx      # Navigation header
│   │   ├── Footer.jsx      # Site footer
│   │   ├── MobileMenu.jsx  # Mobile navigation
│   │   └── ProductCard.jsx # Product display card
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Homepage
│   │   ├── About.jsx       # About page
│   │   ├── Contact.jsx     # Contact page
│   │   ├── Products.jsx    # Product listing
│   │   ├── ProductDetail.jsx # Product detail page
│   │   ├── Cart.jsx        # Shopping cart
│   │   └── Checkout.jsx    # Checkout process
│   ├── contexts/           # React contexts
│   │   └── CartContext.jsx # Shopping cart state
│   ├── services/           # API services
│   │   └── api.js          # API client configuration
│   ├── styles/             # CSS styles
│   │   └── global.css      # Global styles and variables
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Base styles
├── package.json
├── vite.config.js
└── index.html
```

## 🎨 Design System

### Color Palette
- **Primary**: #8B5E83 (Deep Purple)
- **Secondary**: #E6E6FA (Lavender)
- **Accent**: #9370DB (Medium Purple)
- **Light Purple**: #D8BFD8 (Light Lavender)
- **Gray**: #808080 (Medium Gray)
- **Light Gray**: #F5F5F5 (Light Gray)

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: 600 weight
- **Body**: 400 weight
- **Small Text**: 500 weight

### Components
- **Buttons**: Primary, Secondary, Outline variants
- **Cards**: Product cards, info cards
- **Forms**: Input fields, validation
- **Navigation**: Header, mobile menu
- **Layout**: Grid system, containers

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Production
npm run build        # Create optimized build
```

## 🔧 Configuration

### Vite Configuration
- **Port**: 3000
- **API Proxy**: /api → http://localhost:5000
- **Build Output**: dist/
- **Source Maps**: Enabled

### Environment Variables
```env
VITE_API_URL=http://localhost:5000/api
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Mobile Features
- **Touch-friendly** buttons and inputs
- **Swipe gestures** for navigation
- **Optimized images** for fast loading
- **Collapsible** mobile menu

## 🎯 Key Features

### Shopping Experience
- **Product Catalog** with filtering and search
- **Shopping Cart** with persistent storage
- **Product Details** with image gallery
- **Checkout Flow** with form validation
- **Order Confirmation** with tracking

### User Interface
- **Modern Design** with purple theme
- **Smooth Animations** and transitions
- **Loading States** for better UX
- **Error Handling** with user feedback
- **Accessibility** features

### Performance
- **Code Splitting** for faster loading
- **Image Optimization** with proper sizing
- **Lazy Loading** for better performance
- **Caching** for API responses

## 🔌 API Integration

### Services
- **Products API** - Product management
- **Orders API** - Order processing
- **Contact API** - Contact form handling
- **Newsletter API** - Subscription management

### Error Handling
- **Network Errors** with retry logic
- **Validation Errors** with field highlighting
- **User Feedback** with toast notifications

## 🧪 Testing

### Test Structure
```
src/
├── __tests__/           # Test files
├── components/          # Component tests
├── pages/              # Page tests
└── utils/              # Utility tests
```

### Running Tests
```bash
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

## 🚀 Deployment

### Build Process
1. **Install Dependencies**: `npm install`
2. **Build Project**: `npm run build`
3. **Deploy**: Upload `dist/` folder

### Deployment Platforms
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Environment Setup
```bash
# Production environment
VITE_API_URL=https://your-api-domain.com/api
```

## 🎨 Customization

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx`

### Styling Changes
1. Update CSS variables in `src/styles/global.css`
2. Modify component styles
3. Add new utility classes

### API Integration
1. Add new endpoints in `src/services/api.js`
2. Create service functions
3. Use in components with proper error handling

## 🐛 Troubleshooting

### Common Issues
1. **API Connection**: Check backend server is running
2. **Build Errors**: Clear node_modules and reinstall
3. **Styling Issues**: Check CSS variable definitions
4. **Mobile Issues**: Test on actual devices

### Debug Mode
```bash
# Enable debug logging
DEBUG=true npm run dev
```

## 📚 Dependencies

### Core Dependencies
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Development Dependencies
- **Vite** - Build tool
- **ESLint** - Code linting
- **@vitejs/plugin-react** - React plugin

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**The Chandra Bella Naturals** - Frontend ✨
