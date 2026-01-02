/**
 * i18n Configuration for Frontend
 *
 * CRITICAL: All translations come from Backend Config System!
 * NO hardcoded translations in frontend code!
 *
 * Multi-language support with external config
 * Supports: German (de) and English (en)
 *
 * Usage:
 * import { t, changeLanguage } from '@eckert-preisser/shared/utils/i18n';
 *
 * const message = t('user.created');
 * changeLanguage('en');
 */

import { logger } from './logger';

interface Translations {
  [key: string]: string;
}

interface LanguageConfig {
  de: Translations;
  en: Translations;
}

let currentLanguage: string = 'de';
let translations: LanguageConfig = {
  de: {},
  en: {},
};
let isInitialized = false;

/**
 * Initialize i18n system
 * Loads translations from Backend Config System
 */
export const initI18n = async (): Promise<void> => {
  try {
    logger.info('I18N_INIT_001', 'Initializing i18n system');

    // Load language config from backend
    const response = await fetch('/api/config/language');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const config = await response.json();
    currentLanguage = config.defaultLanguage || 'de';

    logger.info('I18N_INIT_002', 'Language config loaded',
      { defaultLanguage: currentLanguage, supported: config.supportedLanguages });

    // Load translations for all languages
    await loadTranslations('de');
    await loadTranslations('en');

    isInitialized = true;
    logger.info('I18N_INIT_003', 'i18n system initialized successfully',
      { currentLanguage, translationCount: Object.keys(translations.de).length });

  } catch (error) {
    logger.error('I18N_INIT_ERR_001', 'Failed to initialize i18n from backend', error as Error);
    // Use minimal fallback
    loadMinimalFallback();
  }
};

/**
 * Load translations for specific language from backend
 */
const loadTranslations = async (language: string): Promise<void> => {
  try {
    const response = await fetch(`/api/i18n/messages/${language}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    translations[language as keyof LanguageConfig] = data;

    logger.info('I18N_LOAD_001', `Loaded ${language} translations from backend`,
      { language, count: Object.keys(data).length });

  } catch (error) {
    logger.error('I18N_LOAD_ERR_001', `Failed to load ${language} translations from backend`, error as Error,
      { language });
  }
};

/**
 * Minimal fallback translations (used only when backend is unavailable)
 * CRITICAL: These are emergency fallbacks only!
 * In production, ALL translations MUST come from backend!
 */
const loadMinimalFallback = (): void => {
  logger.warn('I18N_FALLBACK_001', 'Using minimal fallback translations - Backend unavailable!');

  // Minimal German fallback
  translations.de = {
    'nav.home': 'Home',
    'nav.products': 'Produkte',
    'nav.dashboard': 'Dashboard',
    'nav.account': 'Konto',
    'button.get.started': 'Jetzt starten',
    'error.loading': 'Laden fehlgeschlagen - Backend nicht verfügbar',
  };

  // Minimal English fallback
  translations.en = {
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.dashboard': 'Dashboard',
    'nav.account': 'Account',
    'button.get.started': 'Get Started',
    'error.loading': 'Loading failed - Backend unavailable',
  };

  currentLanguage = 'de';
  isInitialized = true;
};

/**
 * Translate a key
 */
export const t = (key: string, params?: Record<string, string | number>): string => {
  const translation = translations[currentLanguage as keyof LanguageConfig]?.[key] || key;

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

/**
 * Change current language
 */
export const changeLanguage = (language: string): void => {
  if (language !== 'de' && language !== 'en') {
    logger.warn('I18N_CHANGE_WARN_001', `Unsupported language requested`, { language, fallback: 'de' });
    language = 'de';
  }

  currentLanguage = language;
  localStorage.setItem('language', language);
  logger.info('I18N_CHANGE_001', 'Language changed', { language });

  // Trigger re-render by dispatching custom event
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
};

/**
 * Get current language
 */
export const getCurrentLanguage = (): string => {
  return currentLanguage;
};

/**
 * Get all available languages
 */
export const getAvailableLanguages = (): Array<{ code: string; name: string }> => {
  return [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
  ];
};

/**
 * Check if i18n is initialized
 */
export const isI18nInitialized = (): boolean => {
  return isInitialized;
};

// DEPRECATED: Auto-initialization removed!
// This file is deprecated. Use I18nContext + useConfig instead.
// The old /api/i18n/messages endpoints no longer exist.
// See I18nContext.tsx and useConfig.ts for the new Config API v2.0 system.
//
// If you need language state: import { useTranslation } from '@eckert-preisser/shared/hooks';
// If you need translations: import { useConfig } from '@eckert-preisser/shared/hooks';

if (typeof window !== 'undefined') {
  // Only load saved language preference, NO backend calls!
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && (savedLanguage === 'de' || savedLanguage === 'en')) {
    currentLanguage = savedLanguage;
  }
  // REMOVED: initI18n() call - old endpoints don't exist anymore!
}
