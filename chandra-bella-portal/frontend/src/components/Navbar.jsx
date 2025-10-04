import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, Menu } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const Navbar = ({ onToggleMobileMenu }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const { getTotalItems } = useCart()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <img 
              src="/assets/logo.png" 
              alt="The Chandra Bella Naturals Logo" 
              className="navbar-logo-image"
            />
            <div className="navbar-logo-text">
              <h1 className="navbar-brand-name">
                The Chandra Bella Naturals
              </h1>
              <p className="navbar-tagline">
                Embrace Your Natural Beauty
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar-link ${isActive(item.path) ? 'navbar-link--active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search and Cart */}
          <div className="navbar-actions">
            {/* Search */}
            <div className="navbar-search">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button
                  type="submit"
                  className="search-button"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="navbar-cart"
            >
              <ShoppingBag size={24} />
              {getTotalItems() > 0 && (
                <span className="cart-badge">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={onToggleMobileMenu}
              className="navbar-mobile-btn"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .navbar {
          background: var(--brand-white);
          box-shadow: 0 2px 10px rgba(139, 94, 131, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4rem;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .navbar-logo-image {
          height: 3rem;
          width: auto;
        }

        .navbar-logo-text {
          display: none;
        }

        @media (min-width: 640px) {
          .navbar-logo-text {
            display: block;
          }
        }

        .navbar-brand-name {
          font-size: 1.25rem;
          font-weight: var(--font-weight-bold);
          color: var(--brand-primary);
          margin: 0;
        }

        .navbar-tagline {
          font-size: 0.875rem;
          color: var(--brand-gray);
          font-style: italic;
          margin: 0;
        }

        .navbar-nav {
          display: none;
          align-items: center;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .navbar-nav {
            display: flex;
          }
        }

        .navbar-link {
          font-weight: var(--font-weight-medium);
          color: var(--color-text);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .navbar-link:hover,
        .navbar-link--active {
          color: var(--brand-primary);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .navbar-search {
          position: relative;
        }

        .search-form {
          display: flex;
          align-items: center;
        }

        .search-input {
          width: 16rem;
          padding: 0.5rem 2.5rem 0.5rem 1rem;
          border: 1px solid var(--brand-secondary);
          border-radius: var(--radius-base);
          font-size: 1rem;
          transition: border-color var(--transition-fast);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--brand-primary);
        }

        .search-button {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--brand-gray);
          cursor: pointer;
          padding: 0.25rem;
        }

        .search-button:hover {
          color: var(--brand-primary);
        }

        .navbar-cart {
          position: relative;
          padding: 0.5rem;
          color: var(--color-text);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .navbar-cart:hover {
          color: var(--brand-primary);
        }

        .cart-badge {
          position: absolute;
          top: -0.25rem;
          right: -0.25rem;
          background: var(--brand-accent);
          color: var(--brand-white);
          border-radius: 50%;
          width: 1.25rem;
          height: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: var(--font-weight-bold);
        }

        .navbar-mobile-btn {
          display: block;
          padding: 0.5rem;
          color: var(--color-text);
          background: none;
          border: none;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .navbar-mobile-btn:hover {
          color: var(--brand-primary);
        }

        @media (min-width: 768px) {
          .navbar-mobile-btn {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .navbar-search {
            display: none;
          }
        }
      `}</style>
    </header>
  )
}

export default Navbar