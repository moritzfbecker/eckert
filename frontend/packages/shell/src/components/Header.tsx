import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { t, changeLanguage, getCurrentLanguage } from '../../../shared/utils/i18n'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage())

  // Scroll detection for logo visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Language change listener
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language)
    }
    window.addEventListener('languageChanged', handleLanguageChange as EventListener)
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener)
    }
  }, [])

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode)
    setIsLanguageMenuOpen(false)
  }

  const GermanFlag = () => (
    <svg width="20" height="15" viewBox="0 0 5 3" className="inline-block">
      <rect width="5" height="1" y="0" fill="#000000"/>
      <rect width="5" height="1" y="1" fill="#DD0000"/>
      <rect width="5" height="1" y="2" fill="#FFCE00"/>
    </svg>
  )

  const BritishFlag = () => (
    <svg width="20" height="15" viewBox="0 0 60 30" className="inline-block">
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  )

  const getLanguageDisplay = (code: string) => {
    return code === 'de' ? { flag: <GermanFlag />, code: 'GER' } : { flag: <BritishFlag />, code: 'ENG' }
  }

  return (
    <>
      {/* Logo - Left Top Corner (hidden when scrolled) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
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
                className="text-2xl md:text-3xl font-bold text-black uppercase"
              >
                Eckert Preisser
              </motion.span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Switcher & Account - Right Top Corner */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-6 right-6 z-50"
      >
        <div className="flex items-center gap-3">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="
                h-10
                flex items-center gap-2
                px-4
                bg-black/80 backdrop-blur-[32px]
                border border-white/10
                rounded-md
                text-white text-sm font-semibold uppercase
                hover:bg-black/90
                transition-all duration-300
              "
            >
              <span>{getLanguageDisplay(currentLang).code}</span>
              {getLanguageDisplay(currentLang).flag}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>

            <AnimatePresence>
              {isLanguageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="
                    absolute top-full right-0 mt-2
                    w-full min-w-[140px]
                    bg-black/95 backdrop-blur-[32px]
                    border border-white/10
                    rounded-md
                    shadow-lg
                    overflow-hidden
                  "
                >
                  <button
                    onClick={() => handleLanguageChange('de')}
                    className="
                      w-full flex items-center gap-3
                      px-4 py-2.5
                      text-white text-sm font-semibold uppercase
                      hover:bg-white/10
                      transition-colors duration-200
                    "
                  >
                    <span>GER</span>
                    <GermanFlag />
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="
                      w-full flex items-center gap-3
                      px-4 py-2.5
                      text-white text-sm font-semibold uppercase
                      hover:bg-white/10
                      transition-colors duration-200
                    "
                  >
                    <span>ENG</span>
                    <BritishFlag />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Account Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="
                h-10
                flex items-center gap-2
                px-4
                bg-black/80 backdrop-blur-[32px]
                border border-white/10
                rounded-md
                text-white text-sm font-semibold uppercase
                hover:bg-black/90
                transition-all duration-300
              "
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Account</span>
            </motion.button>

            <AnimatePresence>
              {isAccountMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="
                    absolute top-full right-0 mt-2
                    w-48
                    bg-black/95 backdrop-blur-[32px]
                    border border-white/10
                    rounded-md
                    shadow-lg
                    overflow-hidden
                  "
                >
                  <Link
                    to="/profile"
                    className="
                      block px-4 py-2
                      text-white text-sm uppercase
                      hover:bg-white/10
                      transition-colors duration-200
                    "
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="
                      block px-4 py-2
                      text-white text-sm uppercase
                      hover:bg-white/10
                      transition-colors duration-200
                    "
                  >
                    Settings
                  </Link>
                  <button
                    className="
                      w-full text-left px-4 py-2
                      text-white text-sm uppercase
                      hover:bg-white/10
                      transition-colors duration-200
                    "
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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
          rounded-md
          px-8 py-3
          border border-white/10
          shadow-lg
        ">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/">{t('nav.home').toUpperCase()}</NavLink>
            <NavLink to="/products">{t('nav.products').toUpperCase()}</NavLink>
            <NavLink to="/dashboard">{t('nav.dashboard').toUpperCase()}</NavLink>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                px-5 py-2
                bg-white text-black
                rounded-md
                font-semibold text-sm uppercase
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
                rounded-md
                border border-white/10
                shadow-lg
              "
            >
              <div className="px-6 py-6 space-y-3">
                <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.home').toUpperCase()}
                </MobileNavLink>
                <MobileNavLink to="/products" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.products').toUpperCase()}
                </MobileNavLink>
                <MobileNavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.dashboard').toUpperCase()}
                </MobileNavLink>

                <button
                  className="
                    w-full px-6 py-3
                    bg-white text-black
                    rounded-md
                    font-semibold uppercase
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
