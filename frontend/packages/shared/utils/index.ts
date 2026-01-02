export { api } from './api'
export { logger } from './logger'
export { errorHandler } from './errorHandler'
// DEPRECATED: Old i18n system - use useTranslation + useConfig instead!
// These exports are kept for backwards compatibility but should not be used.
// The old /api/i18n/messages endpoints no longer exist.
// Use: import { useTranslation } from '@eckert-preisser/shared/hooks';
// Use: import { useConfig } from '@eckert-preisser/shared/hooks';
export { t, changeLanguage, getCurrentLanguage, getAvailableLanguages } from './i18n'
export * as authApi from './authApi'
export { email } from './email'
export { cookieManager } from './cookieManager'
export type { CookieConsent } from './cookieManager'
