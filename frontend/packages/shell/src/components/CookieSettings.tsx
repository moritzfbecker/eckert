import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useCookieConsent } from '@eckert-preisser/shared/hooks/useCookieConsent'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'

/**
 * Cookie Settings Modal - DSGVO-Compliant Individual Settings
 *
 * Modal for customizing cookie preferences.
 * 4 categories: Necessary (always on), Functional, Analytics, Marketing
 *
 * Uses Config API v2.0 for all texts (cookie.settings.*)
 *
 * Features:
 * - Toggle switches for each category
 * - Necessary cookies cannot be disabled
 * - Save preferences button
 * - Black/White design with Apple Gradient hover
 * - Framer Motion animations
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 2.16.0
 */
const CookieSettings = () => {
  const { language } = useTranslation()
  const config = useConfig('cookie', language)
  const { showSettingsModal, closeSettings, updateConsent, consent } = useCookieConsent()

  const [preferences, setPreferences] = useState({
    functional: false,
    analytics: false,
    marketing: false
  })

  // Load current preferences
  useEffect(() => {
    if (consent) {
      setPreferences({
        functional: consent.functional,
        analytics: consent.analytics,
        marketing: consent.marketing
      })
    }
  }, [consent])

  const handleSave = () => {
    updateConsent(preferences)
  }

  const handleAcceptAll = () => {
    setPreferences({
      functional: true,
      analytics: true,
      marketing: true
    })
    updateConsent({
      functional: true,
      analytics: true,
      marketing: true
    })
  }

  const handleRejectAll = () => {
    setPreferences({
      functional: false,
      analytics: false,
      marketing: false
    })
    updateConsent({
      functional: false,
      analytics: false,
      marketing: false
    })
  }

  if (!showSettingsModal) {
    return null
  }

  return (
    <AnimatePresence>
      {showSettingsModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSettings}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-full max-w-2xl max-h-[90vh] overflow-y-auto
              bg-white text-black
              rounded-lg shadow-2xl
              z-50
              p-8
              mx-4
            "
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-black">
                {config.get('cookie.settings.title', 'Cookie Settings')}
              </h2>
              <button
                onClick={closeSettings}
                className="text-black/60 hover:text-black transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-black/80 mb-6">
              {config.get('cookie.settings.description', 'Manage your cookie preferences. You can enable or disable different types of cookies below.')}
            </p>

            {/* Cookie Categories */}
            <div className="space-y-4 mb-8">
              {/* Necessary Cookies - Always ON */}
              <div className="bg-black/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-black">
                    {config.get('cookie.category.necessary', 'Necessary Cookies')}
                  </h3>
                  <div className="
                    px-3 py-1
                    bg-black text-white
                    rounded-full
                    text-xs font-semibold uppercase
                  ">
                    {config.get('cookie.settings.alwaysActive', 'Always Active')}
                  </div>
                </div>
                <p className="text-sm text-black/70">
                  {config.get('cookie.category.necessary.description', 'Essential cookies for the website to function. Cannot be disabled.')}
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="bg-black/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-black">
                    {config.get('cookie.category.functional', 'Functional Cookies')}
                  </h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="
                      w-11 h-6
                      bg-black/20
                      peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-500/30
                      rounded-full peer
                      peer-checked:after:translate-x-full
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                      after:bg-white after:border-black/20 after:border after:rounded-full
                      after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-black
                    "></div>
                  </label>
                </div>
                <p className="text-sm text-black/70">
                  {config.get('cookie.category.functional.description', 'Cookies for enhanced functionality and personalization.')}
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-black/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-black">
                    {config.get('cookie.category.analytics', 'Analytics Cookies')}
                  </h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="
                      w-11 h-6
                      bg-black/20
                      peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-500/30
                      rounded-full peer
                      peer-checked:after:translate-x-full
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                      after:bg-white after:border-black/20 after:border after:rounded-full
                      after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-black
                    "></div>
                  </label>
                </div>
                <p className="text-sm text-black/70">
                  {config.get('cookie.category.analytics.description', 'Cookies that help us understand how you use our website.')}
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-black/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-black">
                    {config.get('cookie.category.marketing', 'Marketing Cookies')}
                  </h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="
                      w-11 h-6
                      bg-black/20
                      peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-500/30
                      rounded-full peer
                      peer-checked:after:translate-x-full
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                      after:bg-white after:border-black/20 after:border after:rounded-full
                      after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-black
                    "></div>
                  </label>
                </div>
                <p className="text-sm text-black/70">
                  {config.get('cookie.category.marketing.description', 'Cookies used for advertising and marketing purposes.')}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={handleRejectAll}
                className="
                  flex-1 px-6 py-3
                  bg-white text-black
                  font-semibold rounded-lg
                  border-2 border-black/20
                  hover:shadow-apple-glow
                  hover:scale-105
                  transition-all duration-300
                  uppercase text-sm tracking-wider
                "
              >
                {config.get('cookie.settings.rejectAll', 'Reject All')}
              </button>
              <button
                onClick={handleSave}
                className="
                  flex-1 px-6 py-3
                  bg-black text-white
                  font-bold rounded-lg
                  hover:shadow-apple-glow
                  hover:scale-105
                  transition-all duration-300
                  uppercase text-sm tracking-wider
                "
              >
                {config.get('cookie.settings.save', 'Save Preferences')}
              </button>
              <button
                onClick={handleAcceptAll}
                className="
                  flex-1 px-6 py-3
                  bg-black text-white
                  font-bold rounded-lg
                  hover:shadow-apple-glow
                  hover:scale-105
                  transition-all duration-300
                  uppercase text-sm tracking-wider
                "
              >
                {config.get('cookie.settings.acceptAll', 'Accept All')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CookieSettings
