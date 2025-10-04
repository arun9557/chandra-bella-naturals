# The Chandra Bella Naturals - Frontend

A modern, responsive e-commerce website for natural beauty products built with React and Vite.

## 🚀 Features

- **Modern React Architecture**: Built with React 18, React Router, and Context API
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **Product Management**: Dynamic product listings, search, and filtering
- **Shopping Cart**: Full cart functionality with persistent storage
- **Checkout Flow**: Complete checkout process with form validation
- **Product Details**: Detailed product pages with image galleries
- **Brand Pages**: About Us and Contact pages with forms
- **Performance Optimized**: Fast loading with Vite bundling
- **Accessibility**: ARIA labels and keyboard navigation support

## 🎨 Design System

- **Color Scheme**: Purple and lavender with gray accents
- **Typography**: Inter font family for modern readability
- **Components**: Reusable, modular React components
- **Icons**: Lucide React for consistent iconography
- **Animations**: Smooth transitions and hover effects

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Variables
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios (ready for API integration)

## 📁 Project Structure

```
frontend/
├── public/
│   └── assets/
│       └── logo.png
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── MobileMenu.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   ├── contexts/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── productData.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Cart.jsx
│   │   └── Checkout.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features

### Home Page
- Hero section with brand logo and call-to-action
- Featured products showcase
- Brand values and mission
- Product categories grid
- Newsletter signup

### Products Page
- Advanced filtering (category, price, rating)
- Search functionality
- Sorting options
- Grid/List view toggle
- Responsive product cards

### Product Detail Page
- High-quality product images
- Detailed product information
- Ingredients and usage instructions
- Quantity selector
- Add to cart functionality
- Wishlist and share options

### Shopping Cart
- Persistent cart storage
- Quantity management
- Item removal
- Order summary
- Secure checkout flow

### Checkout Process
- Multi-step checkout form
- Shipping information
- Payment method selection
- Form validation
- Order confirmation

### About Us Page
- Company story and mission
- Team information
- Values and process
- Brand commitment

### Contact Page
- Contact information
- Contact form with validation
- Newsletter signup
- Social media links

## 🎨 Design System

### Colors
- **Primary**: #8B5E83 (Deep Purple)
- **Secondary**: #E6E6FA (Lavender)
- **Accent**: #9370DB (Medium Purple)
- **Light Purple**: #D8BFD8
- **Gray**: #808080
- **Light Gray**: #F5F5F5

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: Bold, 600 weight
- **Body**: Regular, 400 weight
- **Small Text**: 14px base size

### Components
- **Buttons**: Primary, secondary, outline variants
- **Cards**: Product cards, info cards
- **Forms**: Input fields, selectors, checkboxes
- **Navigation**: Header, mobile menu, breadcrumbs

## 🔧 Customization

### Adding New Products
Edit `src/data/productData.js` to add new products:

```javascript
{
  id: 12,
  name: "New Product",
  price: "₹999",
  image: "/assets/products/new-product.jpg",
  rating: 4.5,
  reviews: 100,
  description: "Product description",
  ingredients: ["Ingredient 1", "Ingredient 2"],
  usage: "How to use",
  category: "face"
}
```

### Styling
- Global styles: `src/styles/global.css`
- Component styles: Inline styles with CSS variables
- Responsive breakpoints: Mobile-first approach

### API Integration
The project is ready for backend API integration:

1. Replace mock data in `src/data/productData.js`
2. Add API calls using Axios
3. Update context providers for real data
4. Add loading states and error handling

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

All components are fully responsive with mobile-first design.

## ♿ Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast ratios
- Semantic HTML structure
- Focus management

## 🚀 Performance

- Vite for fast development and building
- Code splitting with React Router
- Optimized images and assets
- Lazy loading for better performance
- Minimal bundle size

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] PWA capabilities
- [ ] Advanced search filters
- [ ] Product recommendations
- [ ] Social media integration

## 📄 License

This project is proprietary to The Chandra Bella Naturals.

## 🤝 Contributing

This is a private project. For any issues or suggestions, please contact the development team.

---

**The Chandra Bella Naturals** - Embrace Your Natural Beauty ✨