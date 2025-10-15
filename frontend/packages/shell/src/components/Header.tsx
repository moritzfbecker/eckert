import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { LanguageSwitcher } from '../../../shared/ui-components/LanguageSwitcher'
import { t } from '../../../shared/utils/i18n'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Logo - Left Top Corner */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-6 left-6 z-50"
      >
        <Link to="/" className="block">
          <motion.span
            whileHover={{
              scale: 1.05,
              background: 'linear-gradient(135deg, #FF2D55 0%, #AF52DE 50%, #007AFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            transition={{ duration: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-black"
          >
            Eckert Preisser
          </motion.span>
        </Link>
      </motion.div>

      {/* Language Switcher - Right Top Corner */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-6 right-6 z-50"
      >
        <LanguageSwitcher />
      </motion.div>

      {/* Center Navigation Bar */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        <nav className="
          bg-black/80 backdrop-blur-[32px]
          rounded-full
          px-8 py-3
          border border-white/10
          shadow-lg
        ">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/">{t('nav.home')}</NavLink>
            <NavLink to="/products">{t('nav.products')}</NavLink>
            <NavLink to="/dashboard">{t('nav.dashboard')}</NavLink>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                px-5 py-2
                bg-white text-black
                rounded-full
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
                absolute top-full left-1/2 -translate-x-1/2 mt-4
                w-[280px]
                bg-black/95 backdrop-blur-[32px]
                rounded-2xl
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

                <button
                  className="
                    w-full px-6 py-3
                    bg-white text-black
                    rounded-full
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
    </>
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
