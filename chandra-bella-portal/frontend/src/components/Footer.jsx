import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { path: '/', label: 'Home' },
        { path: '/products', label: 'Shop' },
        { path: '/about', label: 'About Us' },
        { path: '/contact', label: 'Contact' },
      ]
    },
    {
      title: 'Customer Care',
      links: [
        { path: '/privacy', label: 'Privacy Policy' },
        { path: '/returns', label: 'Return Policy' },
        { path: '/shipping', label: 'Shipping Info' },
        { path: '/faq', label: 'FAQ' },
      ]
    },
    {
      title: 'Categories',
      links: [
        { path: '/products?category=face', label: 'Face' },
        { path: '/products?category=lips', label: 'Lips' },
        { path: '/products?category=skincare', label: 'Skincare' },
        { path: '/products?category=hair', label: 'Hair' },
        { path: '/products?category=body', label: 'Body' },
      ]
    }
  ]

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  const contactInfo = [
    { icon: Mail, text: 'hello@chandrabella.com' },
    { icon: Phone, text: '+91 98765 43210' },
    { icon: MapPin, text: '123 Beauty Lane, Mumbai, Maharashtra 400001' },
  ]

  return (
    <footer className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/assets/logo.png" 
                alt="The Chandra Bella Naturals Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h3 className="text-lg font-bold">The Chandra Bella Naturals</h3>
                <p className="text-sm opacity-90">Embrace Your Natural Beauty</p>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Premium natural beauty products crafted with love and the finest botanical ingredients.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm opacity-90 hover:opacity-100 hover:text-white transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <info.icon size={16} className="mt-1 flex-shrink-0" />
                  <span className="text-sm opacity-90">{info.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 pt-8 border-t border-white border-opacity-20">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2">Stay Beautiful with Our Updates</h4>
            <p className="text-sm opacity-90 mb-4">
              Get exclusive offers, beauty tips, and new product launches
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-[var(--brand-primary)] rounded-lg font-medium hover:bg-opacity-90 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white border-opacity-20 text-center">
          <p className="text-sm opacity-90">
            &copy; {currentYear} The Chandra Bella Naturals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer