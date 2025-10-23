import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { useAuth } from '@eckert-preisser/shared/contexts/AuthContext'

/**
 * Header Component - v2.0 Config API
 *
 * Uses NEW useConfig Hook for translations with auto-registration.
 * English defaults in code, German from Config Server.
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Keep useTranslation for language state (backward compatible)
  const { language, changeLanguage } = useTranslation()

  // NEW v2.0: useConfig with 'common' category and DYNAMIC language
  const config = useConfig('common', language)

  // Auth state
  const { user, logout, isAuthenticated } = useAuth()

  const location = useLocation()

  // Scroll detection for logo visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode)
    setIsLanguageMenuOpen(false)
  }

  // Language definitions with SVG flags
  const languages = [
    {
      code: 'de',
      label: 'Deutsch',
      flagSvg: (
        <svg className="w-4 h-3" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
          <rect width="5" height="3" fill="#000"/>
          <rect width="5" height="2" y="1" fill="#D00"/>
          <rect width="5" height="1" y="2" fill="#FFCE00"/>
        </svg>
      )
    },
    {
      code: 'en',
      label: 'English',
      flagSvg: (
        <svg className="w-4 h-3" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
          <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
          <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
      )
    }
  ]

  // Navigation links - v2.0 with English defaults
  const navLinks = [
    { name: config.get('nav.home', 'Home'), path: '/' },
    { name: config.get('nav.concept', 'Concept'), path: '/concept' },
    { name: config.get('nav.about', 'About'), path: '/about' },
    { name: config.get('nav.contact', 'Contact'), path: '/contact' }
  ]

  const currentLanguage = languages.find(l => l.code === language) || languages[0]

  return (
    <>
      {/* Logo - Left Top Corner (hidden when scrolled) */}
      <div className={`
        fixed top-6 left-6 z-50
        text-lg font-bold tracking-wider text-black
        transition-opacity duration-300
        ${!isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <Link to="/">ECKERT PREISSER</Link>
      </div>

      {/* Main Header Container */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-start px-6 mt-4">
        {/* Left Spacer */}
        <div className="flex-1 md:flex-1" />

        {/* Center Navigation */}
        <div className="
          hidden md:flex items-center justify-center
          px-2 py-1.5
          rounded-xl
          transition-all duration-300
          bg-black/60 backdrop-blur-sm border border-white/10 shadow-lg
        ">
          {navLinks.length > 0 && (
            <nav className="flex items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    text-gray-200 hover:text-white transition-colors
                    px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider
                    ${location.pathname === link.path ? 'text-white' : ''}
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center px-3 py-2 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 shadow-lg"
        >
          <svg className="w-6 h-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Right Side - Language Selector & Account */}
        <div className="hidden md:flex flex-1 justify-end gap-3">
          {/* Language Selector */}
          <div className="
            flex items-center justify-center
            px-2 py-1.5
            rounded-xl
            transition-all duration-300
            bg-black/60 backdrop-blur-sm border border-white/10 shadow-lg
            relative
          ">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              {currentLanguage.flagSvg}
              <span>{currentLanguage.code.toUpperCase()}</span>
              <svg
                className={`w-3 h-3 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Language Dropdown */}
            {isLanguageMenuOpen && (
              <div className="absolute top-full mt-2 right-0 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden min-w-[160px]">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`
                      w-full px-4 py-2 text-left text-xs hover:bg-white/10 transition-colors
                      flex items-center gap-2
                      ${language === lang.code ? 'text-white bg-white/5' : 'text-gray-300'}
                    `}
                  >
                    <div className="flex-shrink-0">{lang.flagSvg}</div>
                    <span className="font-semibold uppercase tracking-wider">{lang.code.toUpperCase()}</span>
                    <span className="opacity-75">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Buttons - Show based on auth status */}
          {isAuthenticated && user ? (
            /* Logged In - User Menu */
            <div className="flex items-center justify-center px-2 py-1.5 rounded-xl transition-all duration-300 bg-black/60 backdrop-blur-sm border border-white/10 shadow-lg relative">
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="text-gray-200 hover:text-white transition-colors px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {user.firstName}
                <svg className={`w-3 h-3 transition-transform ${isAccountMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isAccountMenuOpen && (
                <div className="absolute top-full mt-2 right-0 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden min-w-[180px]">
                  <Link to="/dashboard" onClick={() => setIsAccountMenuOpen(false)} className="w-full px-4 py-3 text-left text-xs hover:bg-white/10 transition-colors flex items-center gap-2 text-gray-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-semibold uppercase tracking-wider">{config.get('nav.dashboard', 'Dashboard')}</span>
                  </Link>
                  <button onClick={() => { logout(); setIsAccountMenuOpen(false) }} className="w-full px-4 py-3 text-left text-xs hover:bg-white/10 transition-colors flex items-center gap-2 text-gray-300 border-t border-white/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-semibold uppercase tracking-wider">{config.get('nav.logout', 'Logout')}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Not Logged In - Login/Register Buttons */
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-6 py-2 text-black hover:text-black/60 text-xs font-semibold uppercase tracking-wider transition-colors">
                {config.get('nav.login', 'Login')}
              </Link>
              <Link to="/register" className="px-6 py-2 bg-black text-white rounded-md hover:shadow-apple-glow hover:scale-105 transition-all duration-300 text-xs font-semibold uppercase tracking-wider">
                {config.get('nav.register', 'Register')}
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="fixed top-20 right-4 left-4 bg-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            {/* Navigation Links */}
            <nav className="flex flex-col">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    px-6 py-4 text-gray-200 hover:text-white hover:bg-white/5 transition-colors
                    text-sm font-semibold uppercase tracking-wider
                    ${location.pathname === link.path ? 'text-white bg-white/5' : ''}
                    ${index !== 0 ? 'border-t border-white/10' : ''}
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Language Selector for Mobile */}
            <div className="border-t border-white/10 px-6 py-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Language</div>
              <div className="flex flex-col gap-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`
                      flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                      ${language === lang.code ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'}
                    `}
                  >
                    {lang.flagSvg}
                    <span className="font-semibold uppercase text-sm">{lang.code.toUpperCase()}</span>
                    <span className="opacity-75 text-sm">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Account Section for Mobile */}
            <div className="border-t border-white/10">
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-6 py-4 text-gray-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm font-semibold uppercase tracking-wider">{config.get('nav.dashboard', 'Dashboard')}</span>
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                }}
                className="w-full flex items-center gap-3 px-6 py-4 text-gray-200 hover:text-white hover:bg-white/5 transition-colors border-t border-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-semibold uppercase tracking-wider">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
