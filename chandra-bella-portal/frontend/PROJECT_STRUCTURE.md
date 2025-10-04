# Project Structure - The Chandra Bella Naturals Frontend

## 📁 Complete Directory Structure

```
frontend/
├── public/
│   └── assets/
│       └── logo.png                    # Brand logo image
├── src/
│   ├── components/                     # Reusable React components
│   │   ├── Layout.jsx                 # Main layout wrapper
│   │   ├── Navbar.jsx                 # Navigation header
│   │   ├── MobileMenu.jsx             # Mobile navigation menu
│   │   ├── Footer.jsx                 # Site footer
│   │   └── ProductCard.jsx            # Product display card
│   ├── contexts/                      # React Context providers
│   │   └── CartContext.jsx            # Shopping cart state management
│   ├── data/                          # Static data and mock APIs
│   │   └── productData.js             # Product data and helper functions
│   ├── pages/                         # Page components
│   │   ├── Home.jsx                   # Homepage
│   │   ├── Products.jsx               # Product listing page
│   │   ├── ProductDetail.jsx          # Individual product page
│   │   ├── About.jsx                  # About Us page
│   │   ├── Contact.jsx                # Contact page
│   │   ├── Cart.jsx                   # Shopping cart page
│   │   └── Checkout.jsx               # Checkout process page
│   ├── services/                      # API service layer
│   │   └── api.js                     # Axios configuration and API calls
│   ├── styles/                        # Global styles
│   │   └── global.css                 # CSS variables and base styles
│   ├── App.jsx                        # Main app component
│   ├── main.jsx                       # React entry point
│   └── index.css                      # Additional global styles
├── scripts/                           # Build and deployment scripts
│   └── deploy.sh                      # Deployment script
├── .eslintrc.cjs                      # ESLint configuration
├── .gitignore                         # Git ignore rules
├── env.example                        # Environment variables template
├── index.html                         # HTML entry point
├── netlify.toml                       # Netlify deployment config
├── package.json                       # Dependencies and scripts
├── PROJECT_STRUCTURE.md               # This file
├── README.md                          # Project documentation
└── vite.config.js                     # Vite build configuration
```

## 🎯 Key Features Implemented

### ✅ Completed Features

1. **Modern React Architecture**
   - React 18 with functional components and hooks
   - React Router for client-side routing
   - Context API for state management
   - Component-based architecture

2. **Responsive Design**
   - Mobile-first CSS approach
   - Responsive grid layouts
   - Mobile navigation menu
   - Touch-friendly interactions

3. **E-commerce Functionality**
   - Product listing with search and filters
   - Shopping cart with persistent storage
   - Complete checkout process
   - Product detail pages

4. **Brand Integration**
   - Purple and lavender color scheme
   - Brand logo prominently displayed
   - Consistent typography and spacing
   - Professional UI/UX design

5. **Performance Optimizations**
   - Vite for fast development and building
   - Code splitting with React Router
   - Optimized CSS with variables
   - Lazy loading ready

6. **Developer Experience**
   - ESLint configuration
   - Hot reloading with Vite
   - Modular file structure
   - Comprehensive documentation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
cd frontend
npm install
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Customization

### Adding New Products
Edit `src/data/productData.js` to add new products to the catalog.

### Styling
- Global styles: `src/styles/global.css`
- Component styles: Inline styles with CSS variables
- Color scheme: Defined in CSS variables

### API Integration
The project is ready for backend integration:
- API service layer: `src/services/api.js`
- Mock data can be replaced with real API calls
- Context providers ready for real data

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎨 Design System

### Colors
- Primary: #8B5E83 (Deep Purple)
- Secondary: #E6E6FA (Lavender)
- Accent: #9370DB (Medium Purple)
- Light Purple: #D8BFD8
- Gray: #808080
- Light Gray: #F5F5F5

### Typography
- Font Family: Inter, system fonts
- Headings: Bold, 600 weight
- Body: Regular, 400 weight

## 🔮 Future Enhancements

- [ ] User authentication system
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] PWA capabilities
- [ ] Advanced search filters
- [ ] Product recommendations
- [ ] Social media integration

## 📄 File Descriptions

### Core Files
- `App.jsx` - Main application component with routing
- `main.jsx` - React application entry point
- `index.html` - HTML template

### Components
- `Layout.jsx` - Wrapper component for all pages
- `Navbar.jsx` - Navigation header with search and cart
- `MobileMenu.jsx` - Slide-out mobile navigation
- `Footer.jsx` - Site footer with links and newsletter
- `ProductCard.jsx` - Reusable product display component

### Pages
- `Home.jsx` - Landing page with hero, featured products, categories
- `Products.jsx` - Product listing with filters and search
- `ProductDetail.jsx` - Individual product information page
- `About.jsx` - Company information and team
- `Contact.jsx` - Contact form and information
- `Cart.jsx` - Shopping cart management
- `Checkout.jsx` - Order placement process

### Context & State
- `CartContext.jsx` - Shopping cart state management with localStorage

### Data & Services
- `productData.js` - Mock product data and helper functions
- `api.js` - API service layer for backend integration

### Styles
- `global.css` - CSS variables and base styles
- `index.css` - Additional global styles and utilities

## 🚀 Deployment

The project is ready for deployment to:
- Netlify (configuration included)
- Vercel
- GitHub Pages
- Any static hosting service

Build command: `npm run build`
Output directory: `dist/`

---

**The Chandra Bella Naturals** - Embrace Your Natural Beauty ✨
