import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { LanguageSwitcher } from '../../../shared/ui-components/LanguageSwitcher'
import { t } from '../../../shared/utils/i18n'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[95%] max-w-[1400px]
      "
    >
      <nav className="
        bg-black/80 backdrop-blur-[32px]
        rounded-xl
        px-6 md:px-8 py-4
        flex items-center justify-between
        border border-white/10
        shadow-lg
      ">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold">
          <motion.span
            whileHover={{
              scale: 1.02,
              background: 'linear-gradient(135deg, #FF2D55 0%, #AF52DE 50%, #007AFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            Eckert Preisser
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <NavLink to="/">{t('nav.home')}</NavLink>
          <NavLink to="/products">{t('nav.products')}</NavLink>
          <NavLink to="/dashboard">{t('nav.dashboard')}</NavLink>

          <div className="[&_button]:!bg-white/10 [&_button]:!text-white [&_button]:!border-white/20 [&_button[class*='bg-black']]:!bg-white [&_button[class*='bg-black']]:!text-black">
            <LanguageSwitcher />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              px-5 py-2
              bg-white text-black
              rounded-lg
              font-semibold text-sm
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
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="
              md:hidden
              absolute top-full left-0 right-0 mt-2
              bg-black/95 backdrop-blur-[32px]
              rounded-xl
              border border-white/10
              shadow-lg
            "
          >
            <div className="px-6 py-6 space-y-3">
              <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                {t('nav.home')}
              </MobileNavLink>
              <MobileNavLink to="/products" onClick={() => setIsMobileMenuOpen(false)}>
                {t('nav.products')}
              </MobileNavLink>
              <MobileNavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                {t('nav.dashboard')}
              </MobileNavLink>

              <div className="pt-3 border-t border-white/10 [&_button]:!bg-white/10 [&_button]:!text-white [&_button]:!border-white/20 [&_button[class*='bg-black']]:!bg-white [&_button[class*='bg-black']]:!text-black">
                <LanguageSwitcher />
              </div>

              <button
                className="
                  w-full px-6 py-3
                  bg-white text-black
                  rounded-lg
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
  <motion.div whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
    <Link
      to={to}
      className="
        text-white
        font-medium text-sm
        transition-all duration-300
        relative
        after:absolute after:bottom-0 after:left-0 after:right-0
        after:h-[2px] after:bg-apple-gradient
        after:scale-x-0 hover:after:scale-x-100
        after:transition-transform after:duration-300
      "
    >
      {children}
    </Link>
  </motion.div>
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
      text-white
      hover:bg-white/10
      rounded-lg
      font-medium
      transition-all duration-300
    "
  >
    {children}
  </Link>
)

export default Header
