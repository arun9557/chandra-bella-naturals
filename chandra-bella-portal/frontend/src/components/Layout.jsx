import { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileMenu from './MobileMenu'

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleMobileMenu={toggleMobileMenu} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
