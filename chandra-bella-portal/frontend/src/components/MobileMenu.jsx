import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

const MobileMenu = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  const categories = [
    { path: '/products?category=face', label: 'Face' },
    { path: '/products?category=lips', label: 'Lips' },
    { path: '/products?category=skincare', label: 'Skincare' },
    { path: '/products?category=hair', label: 'Hair' },
    { path: '/products?category=body', label: 'Body' },
  ]

  if (!isOpen) return null

  return (
    <div className="mobile-menu" data-open={isOpen}>
      {/* Backdrop */}
      <div 
        className="mobile-menu-backdrop" 
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="mobile-menu-content">
        <div className="mobile-menu-header">
          <h2 className="mobile-menu-title">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="mobile-menu-close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mobile-menu-nav">
          <div className="mobile-menu-section">
            <h3 className="mobile-menu-section-title">
              Pages
            </h3>
            <ul className="mobile-menu-list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="mobile-menu-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mobile-menu-section">
            <h3 className="mobile-menu-section-title">
              Categories
            </h3>
            <ul className="mobile-menu-list">
              {categories.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="mobile-menu-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div className="mobile-menu-footer">
          <div className="mobile-menu-brand">
            <img 
              src="/assets/logo.png" 
              alt="The Chandra Bella Naturals Logo" 
              className="mobile-menu-logo"
            />
            <p className="mobile-menu-tagline">
              Embrace Your Natural Beauty
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 50;
        }

        @media (min-width: 768px) {
          .mobile-menu {
            display: none;
          }
        }

        .mobile-menu-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
        }

        .mobile-menu-content {
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: 20rem;
          background: var(--brand-white);
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
          display: flex;
          flex-direction: column;
        }

        .mobile-menu .mobile-menu-content {
          transform: translateX(0);
        }

        .mobile-menu-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--brand-light-purple);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mobile-menu-title {
          font-size: 1.25rem;
          font-weight: var(--font-weight-bold);
          color: var(--brand-primary);
          margin: 0;
        }

        .mobile-menu-close {
          padding: 0.5rem;
          color: var(--brand-gray);
          background: none;
          border: none;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .mobile-menu-close:hover {
          color: var(--brand-primary);
        }

        .mobile-menu-nav {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
        }

        .mobile-menu-section {
          margin-bottom: 2rem;
        }

        .mobile-menu-section-title {
          font-size: 0.875rem;
          font-weight: var(--font-weight-semibold);
          color: var(--brand-gray);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .mobile-menu-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-menu-list li {
          margin-bottom: 0.5rem;
        }

        .mobile-menu-link {
          display: block;
          padding: 0.75rem 1rem;
          color: var(--color-text);
          text-decoration: none;
          border-radius: var(--radius-base);
          transition: all var(--transition-fast);
        }

        .mobile-menu-link:hover {
          color: var(--brand-primary);
          background: var(--brand-secondary);
        }

        .mobile-menu-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--brand-light-purple);
        }

        .mobile-menu-brand {
          text-align: center;
        }

        .mobile-menu-logo {
          height: 2rem;
          width: auto;
          margin: 0 auto 0.5rem;
        }

        .mobile-menu-tagline {
          font-size: 0.875rem;
          color: var(--brand-gray);
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default MobileMenu