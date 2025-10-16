/**
 * i18n React Context
 *
 * Provides i18n functionality to all React components
 * Triggers re-renders when language changes or translations load
 *
 * CRITICAL: All translations come from Backend Config System!
 *
 * Usage:
 * import { useTranslation } from '@eckert-preisser/shared/hooks';
 * const { t, language, changeLanguage } = useTranslation();
 */

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { logger } from '../utils/logger';

interface Translations {
  [key: string]: string;
}

interface LanguageConfig {
  de: Translations;
  en: Translations;
}

interface I18nContextType {
  t: (key: string, params?: Record<string, string | number>) => string;
  language: string;
  changeLanguage: (lang: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('de');
  const [translations, setTranslations] = useState<LanguageConfig>({ de: {}, en: {} });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load translations from backend on mount
  useEffect(() => {
    const initI18n = async () => {
      try {
        logger.info('I18N_CTX_001', 'Initializing i18n context from backend');

        // Load language config
        const configResponse = await fetch('/api/config/language');
        if (!configResponse.ok) {
          throw new Error(`HTTP ${configResponse.status}: ${configResponse.statusText}`);
        }

        const config = await configResponse.json();
        const defaultLang = config.defaultLanguage || 'de';

        // Check localStorage for saved preference
        const savedLang = localStorage.getItem('language');
        const initialLang = (savedLang === 'de' || savedLang === 'en') ? savedLang : defaultLang;

        logger.info('I18N_CTX_002', 'Language config loaded from backend', {
          defaultLanguage: defaultLang,
          savedLanguage: savedLang,
          initialLanguage: initialLang,
        });

        // Load translations for both languages
        const [deResponse, enResponse] = await Promise.all([
          fetch('/api/i18n/messages/de'),
          fetch('/api/i18n/messages/en'),
        ]);

        if (!deResponse.ok || !enResponse.ok) {
          throw new Error('Failed to load translations from backend');
        }

        const deTranslations = await deResponse.json();
        const enTranslations = await enResponse.json();

        setTranslations({
          de: deTranslations,
          en: enTranslations,
        });

        setLanguage(initialLang);
        setIsLoading(false);

        logger.info('I18N_CTX_003', 'i18n context initialized successfully', {
          language: initialLang,
          deCount: Object.keys(deTranslations).length,
          enCount: Object.keys(enTranslations).length,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        logger.error('I18N_CTX_ERR_001', 'Failed to initialize i18n context', err, {
          error: errorMessage,
        });

        // Load minimal fallback
        setTranslations({
          de: {
            'nav.home': 'Home',
            'nav.products': 'Produkte',
            'nav.dashboard': 'Dashboard',
            'nav.account': 'Konto',
            'nav.logout': 'Abmelden',
            'error.loading': 'Laden fehlgeschlagen',
          },
          en: {
            'nav.home': 'Home',
            'nav.products': 'Products',
            'nav.dashboard': 'Dashboard',
            'nav.account': 'Account',
            'nav.logout': 'Logout',
            'error.loading': 'Loading failed',
          },
        });

        setError(errorMessage);
        setIsLoading(false);

        logger.warn('I18N_CTX_WARN_001', 'Using fallback translations - Backend unavailable');
      }
    };

    initI18n();
  }, []);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[language as keyof LanguageConfig]?.[key] || key;

    if (!params) {
      return translation;
    }

    // Replace {0}, {1}, etc. with params
    let result = translation;
    Object.entries(params).forEach(([index, value]) => {
      result = result.replace(`{${index}}`, String(value));
    });

    return result;
  };

  const changeLanguage = (lang: string) => {
    if (lang !== 'de' && lang !== 'en') {
      logger.warn('I18N_CTX_WARN_002', 'Unsupported language requested', {
        language: lang,
        fallback: 'de',
      });
      lang = 'de';
    }

    setLanguage(lang);
    localStorage.setItem('language', lang);
    logger.info('I18N_CTX_004', 'Language changed', { language: lang });
  };

  const value: I18nContextType = {
    t,
    language,
    changeLanguage,
    isLoading,
    error,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
