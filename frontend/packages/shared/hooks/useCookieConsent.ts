import { useContext } from 'react'
import { CookieConsentContext } from '../contexts/CookieConsentContext'

/**
 * useCookieConsent Hook
 *
 * Hook to access cookie consent state and functions.
 *
 * Usage:
 *   const { consent, hasConsent, acceptAll, rejectAll, openSettings } = useCookieConsent()
 *
 *   if (hasConsentFor('analytics')) {
 *     // Load Google Analytics
 *   }
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 2.16.0
 */
export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext)

  if (context === undefined) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider')
  }

  return context
}
