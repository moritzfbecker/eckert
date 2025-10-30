import { logger } from './logger'

/**
 * Cookie Manager Utility - DSGVO-Compliant Cookie Management
 *
 * Manages user cookie preferences in localStorage.
 * DSGVO-compliant with 4 cookie categories.
 *
 * Categories:
 * - necessary: Always true (Session, Language, etc.) - Cannot be disabled!
 * - functional: User preferences (Dark Mode, etc.)
 * - analytics: Analytics tools (Google Analytics, Matomo, etc.)
 * - marketing: Marketing/Tracking (Ads, etc.)
 *
 * Usage:
 *   const consent = cookieManager.getConsent()
 *   cookieManager.updateConsent({ analytics: true, marketing: false })
 *   if (cookieManager.hasConsent('analytics')) { // Load Google Analytics }
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 2.16.0
 */

export interface CookieConsent {
  necessary: boolean      // Always true - DSGVO requires explicit notice
  functional: boolean     // Optional - User preferences
  analytics: boolean      // Optional - Analytics tracking
  marketing: boolean      // Optional - Marketing/Ads
  timestamp: number       // When consent was given
  version: string         // Consent version (for tracking changes)
}

const STORAGE_KEY = 'cookie_consent'
const CONSENT_VERSION = '1.0.0' // Increment when cookie policy changes

/**
 * Get current cookie consent from localStorage
 * Returns null if no consent given yet
 */
export const getConsent = (): CookieConsent | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      logger.debug('COOKIE_001', 'No cookie consent found')
      return null
    }

    const consent = JSON.parse(stored) as CookieConsent
    logger.debug('COOKIE_002', 'Cookie consent loaded', consent)
    return consent

  } catch (error) {
    logger.error('COOKIE_ERR_001', 'Failed to load cookie consent', error)
    return null
  }
}

/**
 * Check if user has given consent
 */
export const hasConsent = (): boolean => {
  return getConsent() !== null
}

/**
 * Check if specific cookie category is allowed
 *
 * @param category Cookie category to check
 * @returns true if allowed, false otherwise
 */
export const hasConsentFor = (category: keyof Omit<CookieConsent, 'timestamp' | 'version'>): boolean => {
  const consent = getConsent()
  if (!consent) {
    return false
  }
  return consent[category] === true
}

/**
 * Save cookie consent to localStorage
 *
 * @param preferences User cookie preferences
 */
export const saveConsent = (preferences: Omit<CookieConsent, 'timestamp' | 'version' | 'necessary'>): void => {
  try {
    const consent: CookieConsent = {
      necessary: true,  // Always true - DSGVO
      ...preferences,
      timestamp: Date.now(),
      version: CONSENT_VERSION
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    logger.info('COOKIE_003', 'Cookie consent saved', consent)

  } catch (error) {
    logger.error('COOKIE_ERR_002', 'Failed to save cookie consent', error)
  }
}

/**
 * Update existing cookie consent (partial update)
 *
 * @param updates Partial updates to cookie preferences
 */
export const updateConsent = (updates: Partial<Omit<CookieConsent, 'timestamp' | 'version' | 'necessary'>>): void => {
  const current = getConsent()

  if (!current) {
    // No consent yet - save as new
    saveConsent({
      functional: updates.functional ?? false,
      analytics: updates.analytics ?? false,
      marketing: updates.marketing ?? false
    })
    return
  }

  // Update existing
  saveConsent({
    functional: updates.functional ?? current.functional,
    analytics: updates.analytics ?? current.analytics,
    marketing: updates.marketing ?? current.marketing
  })

  logger.info('COOKIE_004', 'Cookie consent updated', updates)
}

/**
 * Accept all cookies
 */
export const acceptAll = (): void => {
  saveConsent({
    functional: true,
    analytics: true,
    marketing: true
  })
  logger.info('COOKIE_005', 'All cookies accepted')
}

/**
 * Reject all optional cookies (only necessary)
 */
export const rejectAll = (): void => {
  saveConsent({
    functional: false,
    analytics: false,
    marketing: false
  })
  logger.info('COOKIE_006', 'All optional cookies rejected')
}

/**
 * Clear cookie consent (for testing)
 */
export const clearConsent = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    logger.info('COOKIE_007', 'Cookie consent cleared')
  } catch (error) {
    logger.error('COOKIE_ERR_003', 'Failed to clear cookie consent', error)
  }
}

/**
 * Check if consent is outdated (version changed)
 */
export const isConsentOutdated = (): boolean => {
  const consent = getConsent()
  if (!consent) {
    return false
  }
  return consent.version !== CONSENT_VERSION
}

/**
 * Export cookie manager
 */
export const cookieManager = {
  getConsent,
  hasConsent,
  hasConsentFor,
  saveConsent,
  updateConsent,
  acceptAll,
  rejectAll,
  clearConsent,
  isConsentOutdated
}
