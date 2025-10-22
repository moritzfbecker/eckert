/**
 * i18n React Context - v3.0 (Simplified for Config API v2.0)
 *
 * Provides ONLY language state management
 * Translations are now loaded via useConfig hook (Config API v2.0)
 *
 * CRITICAL: This context ONLY manages language state + changeLanguage()
 * It does NOT load translations anymore!
 *
 * Usage:
 * import { useTranslation } from '@eckert-preisser/shared/hooks';
 * const { language, changeLanguage } = useTranslation();
 */

import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { logger } from '../utils/logger'

interface I18nContextType {
  language: string
  changeLanguage: (lang: string) => void
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: ReactNode
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('de')

  // Load saved language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang === 'de' || savedLang === 'en') {
      setLanguage(savedLang)
      logger.info('I18N_CTX_001', 'Language loaded from localStorage', { language: savedLang })
    } else {
      logger.info('I18N_CTX_002', 'Using default language', { language: 'de' })
    }
  }, [])

  const changeLanguage = (lang: string) => {
    if (lang !== 'de' && lang !== 'en') {
      logger.warn('I18N_CTX_WARN_001', 'Unsupported language requested', {
        language: lang,
        fallback: 'de',
      })
      lang = 'de'
    }

    setLanguage(lang)
    localStorage.setItem('language', lang)
    logger.info('I18N_CTX_003', 'Language changed', { language: lang })
  }

  const value: I18nContextType = {
    language,
    changeLanguage,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
