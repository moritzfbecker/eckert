import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCookieConsent } from '@eckert-preisser/shared/hooks/useCookieConsent'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'

/**
 * Cookie Consent Banner - DSGVO-Compliant
 *
 * Shows on first visit until user accepts/rejects cookies.
 * Bottom-center position with Black/White design + Apple Gradient hover.
 *
 * Uses Config API v2.0 for all texts (cookie.banner.*)
 *
 * Features:
 * - Accept All / Reject All / Customize
 * - Link to Cookie Policy
 * - Framer Motion animations
 * - Black/White design
 * - Apple Gradient hover effects
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 2.16.0
 */
const CookieConsent = () => {
  const { language } = useTranslation()
  const config = useConfig('cookie', language)
  const { showBanner, acceptAll, rejectAll, openSettings } = useCookieConsent()

  if (!showBanner) {
    return null
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="
            fixed bottom-0 left-0 right-0 z-50
            bg-black/95 backdrop-blur-lg
            border-t border-white/10
            shadow-2xl
            p-6
          "
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2">
                  {config.get('cookie.banner.title', '🍪 We use cookies')}
                </h3>
                <p className="text-white/80 text-sm">
                  {config.get('cookie.banner.text', 'We use cookies to improve your experience. You can customize your preferences or accept all cookies.')}
                  {' '}
                  <Link
                    to="/cookie-policy"
                    className="text-white hover:text-white underline hover:no-underline"
                  >
                    {config.get('cookie.banner.learnMore', 'Learn more')}
                  </Link>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {/* Reject All (Only Necessary) */}
                <button
                  onClick={rejectAll}
                  className="
                    px-6 py-3
                    bg-white text-black
                    font-semibold rounded-lg
                    border border-white/20
                    hover:shadow-apple-glow
                    hover:scale-105
                    transition-all duration-300
                    text-sm uppercase tracking-wider
                    whitespace-nowrap
                  "
                >
                  {config.get('cookie.banner.rejectAll', 'Only Necessary')}
                </button>

                {/* Cookie Settings */}
                <button
                  onClick={openSettings}
                  className="
                    px-6 py-3
                    bg-white text-black
                    font-semibold rounded-lg
                    border border-white/20
                    hover:shadow-apple-glow
                    hover:scale-105
                    transition-all duration-300
                    text-sm uppercase tracking-wider
                    whitespace-nowrap
                  "
                >
                  {config.get('cookie.banner.settings', 'Customize')}
                </button>

                {/* Accept All */}
                <button
                  onClick={acceptAll}
                  className="
                    px-6 py-3
                    bg-white text-black
                    font-bold rounded-lg
                    hover:shadow-apple-glow
                    hover:scale-105
                    transition-all duration-300
                    text-sm uppercase tracking-wider
                    whitespace-nowrap
                  "
                >
                  {config.get('cookie.banner.acceptAll', 'Accept All')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieConsent
