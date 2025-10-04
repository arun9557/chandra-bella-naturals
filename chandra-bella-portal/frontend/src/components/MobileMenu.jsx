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
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[var(--brand-primary)]">
              Menu
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Pages
              </h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="block px-3 py-2 text-gray-700 hover:text-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="block px-3 py-2 text-gray-700 hover:text-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <img 
                src="/assets/logo.png" 
                alt="The Chandra Bella Naturals Logo" 
                className="h-8 mx-auto mb-2"
              />
              <p className="text-sm text-gray-500">
                Embrace Your Natural Beauty
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
