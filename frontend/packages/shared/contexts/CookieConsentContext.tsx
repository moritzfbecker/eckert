import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { cookieManager, CookieConsent } from '../utils/cookieManager'
import { logger } from '../utils/logger'

/**
 * Cookie Consent Context - DSGVO-Compliant Cookie Management
 *
 * Provides cookie consent state and management functions.
 * Auto-loads consent from localStorage on mount.
 *
 * Usage:
 *   const { consent, hasConsent, acceptAll, rejectAll, updateConsent, showSettings } = useCookieConsent()
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 2.16.0
 */

interface CookieConsentContextValue {
  consent: CookieConsent | null
  hasConsent: boolean
  showBanner: boolean
  showSettingsModal: boolean
  acceptAll: () => void
  rejectAll: () => void
  updateConsent: (updates: Partial<Omit<CookieConsent, 'timestamp' | 'version' | 'necessary'>>) => void
  openSettings: () => void
  closeSettings: () => void
  closeBanner: () => void
}

export const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined)

interface CookieConsentProviderProps {
  children: ReactNode
}

export const CookieConsentProvider: React.FC<CookieConsentProviderProps> = ({ children }) => {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  // Load consent on mount
  useEffect(() => {
    logger.info('COOKIE_CTX_001', 'Initializing cookie consent context')

    const savedConsent = cookieManager.getConsent()

    if (savedConsent) {
      setConsent(savedConsent)
      setShowBanner(false)
      logger.info('COOKIE_CTX_002', 'Cookie consent loaded from storage', savedConsent)
    } else {
      setShowBanner(true)
      logger.info('COOKIE_CTX_003', 'No cookie consent - showing banner')
    }
  }, [])

  const acceptAll = () => {
    logger.info('COOKIE_CTX_004', 'User accepted all cookies')
    cookieManager.acceptAll()
    const newConsent = cookieManager.getConsent()
    setConsent(newConsent)
    setShowBanner(false)
    setShowSettingsModal(false)
  }

  const rejectAll = () => {
    logger.info('COOKIE_CTX_005', 'User rejected all optional cookies')
    cookieManager.rejectAll()
    const newConsent = cookieManager.getConsent()
    setConsent(newConsent)
    setShowBanner(false)
    setShowSettingsModal(false)
  }

  const updateConsent = (updates: Partial<Omit<CookieConsent, 'timestamp' | 'version' | 'necessary'>>) => {
    logger.info('COOKIE_CTX_006', 'User updated cookie preferences', updates)
    cookieManager.updateConsent(updates)
    const newConsent = cookieManager.getConsent()
    setConsent(newConsent)
    setShowBanner(false)
    setShowSettingsModal(false)
  }

  const openSettings = () => {
    logger.info('COOKIE_CTX_007', 'Opening cookie settings')
    setShowSettingsModal(true)
    setShowBanner(false)
  }

  const closeSettings = () => {
    logger.info('COOKIE_CTX_008', 'Closing cookie settings')
    setShowSettingsModal(false)

    // If no consent yet, show banner again
    if (!consent) {
      setShowBanner(true)
    }
  }

  const closeBanner = () => {
    // User can close banner, but we'll show it again on next visit if no consent
    setShowBanner(false)
  }

  const value: CookieConsentContextValue = {
    consent,
    hasConsent: consent !== null,
    showBanner,
    showSettingsModal,
    acceptAll,
    rejectAll,
    updateConsent,
    openSettings,
    closeSettings,
    closeBanner
  }

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  )
}
