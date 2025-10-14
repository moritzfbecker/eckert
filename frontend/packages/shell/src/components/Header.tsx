import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { LanguageSwitcher } from '@eckert-preisser/shared/ui'
import { t } from '@eckert-preisser/shared/utils'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        fixed top-0 left-0 right-0 z-50
        bg-black/80 backdrop-blur-porsche
        border-b border-white/10
        h-16 md:h-20
      "
    >
      <nav className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-gradient"
          >
            Eckert Preisser
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/">{t('nav.home')}</NavLink>
          <NavLink to="/products">{t('nav.products')}</NavLink>
          <NavLink to="/dashboard">{t('nav.dashboard')}</NavLink>

          <LanguageSwitcher />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              px-6 py-2
              bg-apple-gradient
              rounded-md
              font-semibold
              hover:shadow-apple-glow
              transition-all duration-300
            "
          >
            {t('button.get.started')}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="
              md:hidden
              bg-black/95 backdrop-blur-porsche
              border-b border-white/10
            "
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                {t('nav.home')}
              </MobileNavLink>
              <MobileNavLink to="/products" onClick={() => setIsMobileMenuOpen(false)}>
                {t('nav.products')}
              </MobileNavLink>
              <MobileNavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                {t('nav.dashboard')}
              </MobileNavLink>

              <div className="pt-4 border-t border-white/10">
                <LanguageSwitcher />
              </div>

              <button
                className="
                  w-full px-6 py-3
                  bg-apple-gradient
                  rounded-md
                  font-semibold
                  hover:shadow-apple-glow
                  transition-all duration-300
                "
              >
                {t('button.get.started')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// Desktop Nav Link Component
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="
      text-gray-300
      hover:text-white
      font-medium
      transition-colors duration-300
      relative
      after:absolute after:bottom-0 after:left-0 after:right-0
      after:h-[2px] after:bg-apple-gradient
      after:scale-x-0 hover:after:scale-x-100
      after:transition-transform after:duration-300
    "
  >
    {children}
  </Link>
)

// Mobile Nav Link Component
const MobileNavLink = ({
  to,
  children,
  onClick,
}: {
  to: string
  children: React.ReactNode
  onClick: () => void
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="
      block px-4 py-3
      text-gray-300 hover:text-white
      hover:bg-white/5
      rounded-md
      font-medium
      transition-all duration-300
    "
  >
    {children}
  </Link>
)

export default Header
